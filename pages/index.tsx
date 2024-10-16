import React, { useState, useEffect, useCallback } from "react";
import WasteItem from "../components/WasteItem";
import Bin from "../components/Bin";
import WinnerDialog from "../components/WinnerDialog";
import GameOverDialog from "../components/GameOverDialog";
import { saveUserScore, saveFarcasterUsername } from "../lib/userDataService";
import {
  usePrivy,
} from "@privy-io/react-auth";
import { Leaderboard } from '../components/Leaderboard'
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import styles from './Home.module.css'; // Make sure to create this CSS module file

export type WasteItemType = {
  name: string;
  category: string;
  // Add any other properties that your waste item should have
};
const wasteItems: WasteItemType[] = [
  // Wet Waste (50 items)
  { name: "Vegetable peels", category: "wet-waste" },
  { name: "Fruit scraps", category: "wet-waste" },
  { name: "Leftover dal", category: "wet-waste" },
  { name: "Tea leaves", category: "wet-waste" },
  { name: "Coffee grounds", category: "wet-waste" },
  { name: "Eggshells", category: "wet-waste" },
  { name: "Used paper tissues", category: "wet-waste" },
  { name: "Fallen leaves", category: "wet-waste" },
  { name: "Grass clippings", category: "wet-waste" },
  { name: "Cooked rice", category: "wet-waste" },
  { name: "Spoiled milk", category: "wet-waste" },
  { name: "Rotten vegetables", category: "wet-waste" },
  { name: "Fish bones", category: "wet-waste" },
  { name: "Meat scraps", category: "wet-waste" },
  { name: "Coconut shells", category: "wet-waste" },
  { name: "Used tea bags", category: "wet-waste" },
  { name: "Banana peels", category: "wet-waste" },
  { name: "Potato skins", category: "wet-waste" },
  { name: "Stale roti", category: "wet-waste" },
  { name: "Wilted flowers", category: "wet-waste" },
  { name: "Leftover sabzi", category: "wet-waste" },
  { name: "Mango seeds", category: "wet-waste" },
  { name: "Onion skins", category: "wet-waste" },
  { name: "Expired yogurt", category: "wet-waste" },
  { name: "Moldy paneer", category: "wet-waste" },
  { name: "Watermelon rinds", category: "wet-waste" },
  { name: "Paan spittle", category: "wet-waste" },
  { name: "Corn cobs", category: "wet-waste" },
  { name: "Sugarcane bagasse", category: "wet-waste" },
  { name: "Coconut husk", category: "wet-waste" },
  { name: "Jackfruit peels", category: "wet-waste" },
  { name: "Tamarind seeds", category: "wet-waste" },
  { name: "Betel nut remains", category: "wet-waste" },
  { name: "Leftover idli", category: "wet-waste" },
  { name: "Spoiled dosa batter", category: "wet-waste" },
  { name: "Used haldi (turmeric) powder", category: "wet-waste" },
  { name: "Discarded curry leaves", category: "wet-waste" },
  { name: "Rotten mangoes", category: "wet-waste" },
  { name: "Spoiled chutney", category: "wet-waste" },
  { name: "Used tea powder", category: "wet-waste" },
  { name: "Leftover poha", category: "wet-waste" },
  { name: "Spoiled sambar", category: "wet-waste" },
  { name: "Rotten tomatoes", category: "wet-waste" },
  { name: "Discarded lemon peels", category: "wet-waste" },
  { name: "Spoiled buttermilk", category: "wet-waste" },
  { name: "Used ginger-garlic paste", category: "wet-waste" },
  { name: "Leftover biryani", category: "wet-waste" },
  { name: "Rotten papaya", category: "wet-waste" },
  { name: "Spoiled raita", category: "wet-waste" },
  { name: "Used cardamom pods", category: "wet-waste" },

  // Dry Waste (50 items)
  { name: "Newspaper", category: "dry-waste" },
  { name: "Cardboard boxes", category: "dry-waste" },
  { name: "Plastic bottles", category: "dry-waste" },
  { name: "Glass jars", category: "dry-waste" },
  { name: "Aluminum cans", category: "dry-waste" },
  { name: "Magazine pages", category: "dry-waste" },
  { name: "Plastic bags", category: "dry-waste" },
  { name: "Tetrapak cartons", category: "dry-waste" },
  { name: "Metal bottle caps", category: "dry-waste" },
  { name: "Empty shampoo bottles", category: "dry-waste" },
  { name: "Plastic food containers", category: "dry-waste" },
  { name: "Broken ceramic cups", category: "dry-waste" },
  { name: "Old clothes", category: "dry-waste" },
  { name: "Shoes", category: "dry-waste" },
  { name: "Empty paint cans", category: "dry-waste" },
  { name: "Plastic toys", category: "dry-waste" },
  { name: "Styrofoam packaging", category: "dry-waste" },
  { name: "Rubber bands", category: "dry-waste" },
  { name: "CD/DVD discs", category: "dry-waste" },
  { name: "Plastic cutlery", category: "dry-waste" },
  { name: "Paper cups", category: "dry-waste" },
  { name: "Tin foil", category: "dry-waste" },
  { name: "Pens and pencils", category: "dry-waste" },
  { name: "Bubble wrap", category: "dry-waste" },
  { name: "Plastic straws", category: "dry-waste" },
  { name: "Empty ghee containers", category: "dry-waste" },
  { name: "Broken bangles", category: "dry-waste" },
  { name: "Old textbooks", category: "dry-waste" },
  { name: "Empty spice bottles", category: "dry-waste" },
  { name: "Plastic buckets", category: "dry-waste" },
  { name: "Broken plastic hangers", category: "dry-waste" },
  { name: "Empty oil cans", category: "dry-waste" },
  { name: "Discarded CFL bulbs", category: "dry-waste" },
  { name: "Old calendars", category: "dry-waste" },
  { name: "Broken plastic toys", category: "dry-waste" },
  { name: "Empty detergent packets", category: "dry-waste" },
  { name: "Plastic packaging of snacks", category: "dry-waste" },
  { name: "Broken plastic combs", category: "dry-waste" },
  { name: "Empty toothpaste tubes", category: "dry-waste" },
  { name: "Discarded plastic utensils", category: "dry-waste" },
  { name: "Old cassette tapes", category: "dry-waste" },
  { name: "Broken plastic chairs", category: "dry-waste" },
  { name: "Empty medicine blister packs", category: "dry-waste" },
  { name: "Discarded plastic folders", category: "dry-waste" },
  { name: "Broken plastic buckets", category: "dry-waste" },
  { name: "Empty plastic oil bottles", category: "dry-waste" },
  { name: "Discarded plastic pens", category: "dry-waste" },
  { name: "Broken plastic rulers", category: "dry-waste" },
  { name: "Empty plastic containers of cosmetics", category: "dry-waste" },
  { name: "Discarded plastic wrappers of sweets", category: "dry-waste" },

  // Hazardous Waste (40 items)
  { name: "Paint thinner", category: "hazardous-waste" },
  { name: "Pesticides", category: "hazardous-waste" },
  { name: "Motor oil", category: "hazardous-waste" },
  { name: "Antifreeze", category: "hazardous-waste" },
  { name: "Asbestos", category: "hazardous-waste" },
  { name: "Mercury thermometers", category: "hazardous-waste" },
  { name: "Lead-acid batteries", category: "hazardous-waste" },
  { name: "Fluorescent light bulbs", category: "hazardous-waste" },
  { name: "Pool chemicals", category: "hazardous-waste" },
  { name: "Bleach", category: "hazardous-waste" },
  { name: "Ammonia", category: "hazardous-waste" },
  { name: "Drain cleaners", category: "hazardous-waste" },
  { name: "Oven cleaners", category: "hazardous-waste" },
  { name: "Glue and adhesives", category: "hazardous-waste" },
  { name: "Photographic chemicals", category: "hazardous-waste" },
  { name: "Expired medications", category: "hazardous-waste" },
  { name: "Nail polish remover", category: "hazardous-waste" },
  { name: "Lighter fluid", category: "hazardous-waste" },
  { name: "Insecticides", category: "hazardous-waste" },
  { name: "Car batteries", category: "hazardous-waste" },
  { name: "Kerosene", category: "hazardous-waste" },
  { name: "Rat poison", category: "hazardous-waste" },
  { name: "Mosquito repellent coils", category: "hazardous-waste" },
  { name: "Hair dye", category: "hazardous-waste" },
  { name: "Expired sunscreen", category: "hazardous-waste" },
  { name: "Used engine oil", category: "hazardous-waste" },
  { name: "Expired cosmetics", category: "hazardous-waste" },
  { name: "Shoe polish", category: "hazardous-waste" },
  { name: "Fungicides", category: "hazardous-waste" },
  { name: "Expired cooking oil", category: "hazardous-waste" },
  { name: "Mothballs", category: "hazardous-waste" },
  { name: "Expired car care products", category: "hazardous-waste" },
  { name: "Expired household cleaners", category: "hazardous-waste" },
  { name: "Used lithium batteries", category: "hazardous-waste" },
  { name: "Expired fire extinguishers", category: "hazardous-waste" },
  { name: "Used printer cartridges", category: "hazardous-waste" },
  { name: "Expired perfumes", category: "hazardous-waste" },
  { name: "Used cooking oil", category: "hazardous-waste" },
  { name: "Expired pesticides", category: "hazardous-waste" },
  { name: "Used syringes", category: "hazardous-waste" },

  // E-Waste (30 items)
  { name: "Old smartphones", category: "e-waste" },
  { name: "Broken laptops", category: "e-waste" },
  { name: "Computer monitors", category: "e-waste" },
  { name: "Printers", category: "e-waste" },
  { name: "Keyboards", category: "e-waste" },
  { name: "Computer mice", category: "e-waste" },
  { name: "Tablets", category: "e-waste" },
  { name: "Digital cameras", category: "e-waste" },
  { name: "MP3 players", category: "e-waste" },
  { name: "Video game consoles", category: "e-waste" },
  { name: "Television sets", category: "e-waste" },
  { name: "DVD players", category: "e-waste" },
  { name: "Electric kettles", category: "e-waste" },
  { name: "Microwave ovens", category: "e-waste" },
  { name: "Electric toothbrushes", category: "e-waste" },
  { name: "Old remote controls", category: "e-waste" },
  { name: "Broken hair dryers", category: "e-waste" },
  { name: "Electric shavers", category: "e-waste" },
  { name: "Outdated smartwatches", category: "e-waste" },
  { name: "Defunct power banks", category: "e-waste" },
  { name: "Broken mixers/grinders", category: "e-waste" },
  { name: "Old CRT monitors", category: "e-waste" },
  { name: "Broken air conditioners", category: "e-waste" },
  { name: "Defunct solar inverters", category: "e-waste" },
  { name: "Old DTH set-top boxes", category: "e-waste" },
  { name: "Broken electric fans", category: "e-waste" },
  { name: "Outdated feature phones", category: "e-waste" },
  { name: "Broken induction cooktops", category: "e-waste" },
  { name: "Old digital calculators", category: "e-waste" },
  { name: "Defunct UPS systems", category: "e-waste" },

  // Sanitary Waste (30 items)
  { name: "Used diapers", category: "sanitary-waste" },
  { name: "Sanitary napkins", category: "sanitary-waste" },
  { name: "Tampons", category: "sanitary-waste" },
  { name: "Bandages", category: "sanitary-waste" },
  { name: "Cotton swabs", category: "sanitary-waste" },
  { name: "Disposable masks", category: "sanitary-waste" },
  { name: "Used gloves", category: "sanitary-waste" },
  { name: "Dental floss", category: "sanitary-waste" },
  { name: "Razor blades", category: "sanitary-waste" },
  { name: "Used tissues", category: "sanitary-waste" },
  { name: "Contact lenses", category: "sanitary-waste" },
  { name: "Hair from brushes", category: "sanitary-waste" },
  { name: "Nail clippings", category: "sanitary-waste" },
  { name: "Used toothbrushes", category: "sanitary-waste" },
  { name: "Wax strips", category: "sanitary-waste" },
  { name: "Used cotton balls", category: "sanitary-waste" },
  { name: "Disposable shoe covers", category: "sanitary-waste" },
  { name: "Used face masks", category: "sanitary-waste" },
  { name: "Disposable cleaning wipes", category: "sanitary-waste" },
  { name: "Used band-aids", category: "sanitary-waste" },
  { name: "Expired condoms", category: "sanitary-waste" },
  { name: "Used menstrual cups", category: "sanitary-waste" },
  { name: "Disposable underwear", category: "sanitary-waste" },
  { name: "Used tongue cleaners", category: "sanitary-waste" },
  { name: "Disposable bed sheets", category: "sanitary-waste" },
  { name: "Used ear buds", category: "sanitary-waste" },
  { name: "Disposable hair nets", category: "sanitary-waste" },
  { name: "Used dental picks", category: "sanitary-waste" },
  { name: "Disposable diapers", category: "sanitary-waste" },
  { name: "Used sanitary pads", category: "sanitary-waste" },
];

type WasteCategory = 'wet-waste' | 'dry-waste' | 'hazardous-waste' | 'sanitary-waste' | 'e-waste';

const categories: WasteCategory[] = [
  "wet-waste",
  "dry-waste",
  "hazardous-waste",
  "sanitary-waste",
  "e-waste",
];


export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>('play');
  const [currentItem, setCurrentItem] = useState<WasteItemType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [binLevels, setBinLevels] = useState<Record<string, number>>({
    "wet-waste": 0,
    "dry-waste": 0,
    "hazardous-waste": 0,
    "sanitary-waste": 0,
    "e-waste": 0,
  });
  const [availableItems, setAvailableItems] = useState<WasteItemType[]>([
    ...wasteItems,
  ]);
  const [correctBin, setCorrectBin] = useState<string | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState<boolean>(false);
  const [completedBin, setCompletedBin] = useState<string | null>(null);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  const { authenticated, login, logout, user } = usePrivy();

  const [isGuestMode, setIsGuestMode] = useState(false);

  // Add this state near your other state declarations
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const enableGuestMode = () => {
    setIsGuestMode(true);
  };

  useEffect(() => {
    selectRandomItem();
  }, []);

  useEffect(() => {
    console.log("Auth state:", { authenticated, user });
  }, [authenticated, user]);

  const selectRandomItem = () => {
    if (availableItems.length === 0) {
      setShowGameOverDialog(true); // Show game over dialog when no items are left
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const newItem = availableItems[randomIndex];
    setCurrentItem(newItem);
    setAvailableItems(
      availableItems.filter((_, index) => index !== randomIndex)
    );
    setCorrectBin(null);
  };

  const handleDrop = (item: WasteItemType, binCategory: string) => {
    if (item.category === binCategory) {
      const newLevel = Math.min(binLevels[binCategory] + 100, 100);
      setBinLevels((prev) => ({
        ...prev,
        [binCategory]: newLevel,
      }));
      const newScore = score + 1;
      setScore(newScore);

      if (newLevel === 100 && !hasShownDialog) {
        setCompletedBin(binCategory);
        setShowWinnerDialog(true);
        setHasShownDialog(true);
        
        // Save the score when a bin is completed
        if (authenticated && !isGuestMode && user?.wallet?.address) {
          console.log("Saving score:", { address: user.wallet.address, newScore });
          saveUserScore(user.wallet.address, newScore, user?.farcaster?.username || null);
        }
      } 
      
      selectRandomItem();
    } else {
      setCorrectBin(item.category);
      setShowGameOverDialog(true);
      
      // Save the score when the game ends
      if (authenticated && !isGuestMode && user?.wallet?.address) {
        console.log("Saving score:", { address: user.wallet.address, score });
        saveUserScore(user.wallet.address, score, user?.farcaster?.username || null);
      }
    }
  };

  const handleTouchDrop = (item: WasteItemType) => {
    setCurrentItem(item);
  };

  const handleBinClick = (binCategory: string) => {
    if (currentItem) {
      handleDrop(currentItem, binCategory);
    }
  };

  const handleContinuePlaying = () => {
    setShowWinnerDialog(false);
    selectRandomItem();
  };

  const handleRestartGame = () => {
    setBinLevels({
      "wet-waste": 0,
      "dry-waste": 0,
      "hazardous-waste": 0,
      "sanitary-waste": 0,
      "e-waste": 0,
    });
    setScore(0);
    setAvailableItems([...wasteItems]);
    setCorrectBin(null);
    setShowWinnerDialog(false);
    setCompletedBin(null);
    setHasShownDialog(false);
    setShowGameOverDialog(false);
    selectRandomItem();
  };

  // Add this function to handle tooltip toggling
  const handleTooltipToggle = useCallback((binCategory: string) => {
    setActiveTooltip(prev => prev === binCategory ? null : binCategory);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!(event.target as Element).closest('.bin-wrapper')) {
      setActiveTooltip(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (authenticated && user?.wallet?.address && user?.farcaster?.username) {
      saveFarcasterUsername(user.wallet.address, user.farcaster.username)
    }
  }, [authenticated, user])

  const updateGuestMode = (newGuestMode: boolean) => {
    setIsGuestMode(newGuestMode);
  };

  return (
    <>
      <div className='game-background'></div>
      <div className='page-container'>
        {currentPage === 'play' && (
          <div className='game-container'>
            <h1 className='game-title'>
              How Wasted Are You?!
              <span className="info-icon">
                <FaInfoCircle className="icon-small" />
                <span className="tooltip">
                  A simple drag and drop game to educate about waste segregation. Double click on bins to see what goes in them. Fill a bin completely to win & Claim an NFT Keep playing to top the leaderboard.
                </span>
              </span>
            </h1>

            <div className='wallet-button-container'>
              {!authenticated && !isGuestMode && (
                <>
                  <button className={`${styles.smallGameButton} ${styles.green}`} onClick={login}>Login</button>
                  <button className={`${styles.smallGameButton} ${styles.orange}`} onClick={enableGuestMode}>Play as Guest</button>
                </>
              )}
              {authenticated && (
                <>
                  <button className={`${styles.smallGameButton} ${styles.red}`} onClick={logout}>Logout</button>
                  <div>{user?.farcaster?.displayName}</div>
                </>
              )}
            </div>

            {(authenticated || isGuestMode) ? (
              <>
                <div className='score'>Score: {score}</div>
                {currentItem && (
                  <WasteItem {...currentItem} onTouchDrop={handleTouchDrop} />
                )}
                <div className='bins-container'>
                  {categories.map((category) => (
                    <Bin
                      key={category}
                      category={category}
                      onDrop={handleDrop}
                      fillLevel={binLevels[category]}
                      isCorrectBin={correctBin === category}
                      isTooltipActive={activeTooltip === category}
                      onTooltipToggle={handleTooltipToggle}
                    />
                  ))}
                </div>

                {showGameOverDialog && (
                  <GameOverDialog
                    score={score}
                    correctBin={correctBin}
                    onPlayAgain={handleRestartGame}
                    isGuestMode={isGuestMode}
                    updateGuestMode={updateGuestMode}  // Make sure this line is present
                  />
                )}

                {showWinnerDialog && completedBin && (
                  <WinnerDialog
                    score={score}
                    completedBin={completedBin}
                    onContinue={handleContinuePlaying}
                    onRestart={handleRestartGame}
                    isGuestMode={isGuestMode}
                    updateGuestMode={updateGuestMode}
                  />
                )}

                <div className={styles.howToPlaySmall}>
                  <h3>How to Play:</h3>
                  <ol>
                    <li>Drag and drop waste items into the correct bins.</li>
                    <li>Double-click on bins to see what goes in them.</li>
                    <li>Fill a bin completely to win and claim an NFT.</li>
                    <li>Keep playing to top the leaderboard!</li>
                  </ol>
                </div>
              </>
            ) : (
              <div className='login-message'>
                <p>Please login or play as a guest to start the game.</p>
              </div>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className='info-section'>
            <h1 className="about-title">Trash Talk: India's Waste Saga</h1>

            <section className="about-section">
              <h2>The Great Indian Garbage Party</h2>
              <p>
                Picture this: India generates more trash than Bollywood produces movies! We're talking about 62 million tonnes of waste annually. That's like filling up the Taj Mahal with garbage 690 times every year. Yikes!
              </p>
              <p>
                Our cities are basically playing a never-ending game of Tetris with trash, and spoiler alert: we're not winning. Only about 70% of our waste gets collected, and a measly 30% gets treated. The rest? It's living its best life in open dumps, probably planning world domination.
              </p>
              <div className="image-container">
                <img src="https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Solid-Waste-Management-in-India%20_0_1200.jpg" alt="Mountain of garbage" />
                <img src="https://media.licdn.com/dms/image/C5112AQE6ad6qqPkseQ/article-cover_image-shrink_600_2000/0/1564039604044?e=2147483647&v=beta&t=AvVCtKIBTjSGzikleZHUKlSV94ETUlVKpT7-VRRob0o" alt="Overflowing garbage bin" />
              </div>
            </section>

            <section className="about-section">
              <h2>India's Trash-tastic Initiatives</h2>
              <p>
                But wait! India isn't just sitting around watching this trash fire burn. We've got some cool plans up our sleeve:
              </p>
              <ul>
                <li>Swachh Bharat Abhiyan: Because nothing says "I love my country" like picking up litter.</li>
                <li>Smart Cities Mission: Making our cities so smart, they'll learn to take out their own trash!</li>
                <li>Plastic Waste Management Rules: Telling plastic it's not fantastic anymore.</li>
              </ul>
              <p>
                These initiatives are like India's version of the Avengers, but instead of fighting Thanos, they're battling garbage. Earth's mightiest heroes? More like Earth's tidiest heroes!
              </p>
              <div className="image-container">
                <img src="https://i.ytimg.com/vi/0JTc08LQYio/maxresdefault.jpg" alt="Swachh Bharat campaign" />
                <img src="https://greensutra.in/wp-content/uploads/2021/09/Ban-on-Single-Use-Plastic.jpeg" alt="Plastic ban initiative" />
              </div>
            </section>

            <section className="about-section">
              <h2>How This Game Saves the World (Sort of)</h2>
              <p>
                Now, you might be thinking, "How does playing with virtual trash help?" Well, dear waste warrior, here's how:
              </p>
              <ul>
                <li>Brain Training: You'll become a waste-sorting ninja in no time.</li>
                <li>Awareness Level: Over 9000! You'll start seeing the world in wet, dry, and e-waste.</li>
                <li>Habit Formation: Soon, you'll be sorting trash in your sleep (not recommended, but impressive).</li>
              </ul>
              <p>
                Plus, every time you play, a landfill somewhere sheds a happy tear. Probably.
              </p>
              <div className="image-container">
                <img src="https://cdn.downtoearth.org.in/library/large/2018-10-15/0.15112900_1539588449_waste-segregation.jpg" alt="Person sorting waste" />
                <img src="https://www.fabhotels.com/blog/wp-content/uploads/2019/03/New-Delhi.jpg" alt="Clean city street" />
              </div>
            </section>

            <section className="about-section">
              <h2>Eco-Awesome Trivia: India's Green Victories</h2>
              <ul>
                <li>Sikkim became India's first fully organic state in 2016. Talk about a natural glow-up!</li>
                <li>The world's largest solar park is in Karnataka, India. It's so bright, even the sun is jealous!</li>
                <li>Mawlynnong in Meghalaya is known as Asia's cleanest village. It's so clean, you could eat off the streets (but please don't).</li>
                <li>India's first recycled plastic road was built in Chennai in 2002. Who knew trash could pave the way to the future?</li>
                <li>The Coimbatore City Municipal Corporation turns food waste into biofuel for its buses. Talk about a tasty ride!</li>
                <li>Bengaluru's 'Wake Up, Clean Up' campaign involves 10,000 volunteers cleaning the city every week. That's what we call a clean sweep!</li>
              </ul>
              <div className="image-container">
                <img src="https://nomadicweekends.com/blog/wp-content/uploads/2019/10/m-3.jpg" alt="Mawlynnong - Asia's cleanest village" />
                <img src="https://media.licdn.com/dms/image/C4E12AQH9grzwrnBtTg/article-cover_image-shrink_600_2000/0/1520057612051?e=2147483647&v=beta&t=1nA8pMiMIlgQUV5JmKnKkuardbeBUrzVJZlhmknUfZI" alt="Plastic waste road in India" />
              </div>
            </section>
          </div>
        )}

        {currentPage === 'leaderboard' && (
          <Leaderboard />
        )}

        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </>
  );
}