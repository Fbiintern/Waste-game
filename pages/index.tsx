import React, { useState, useEffect } from "react";
import WasteItem from "../components/WasteItem";
import Bin from "../components/Bin";
import WinnerDialog from "../components/WinnerDialog";
import { useAccount } from 'wagmi';

export type WasteItemType = {
  name: string;
  category: string;
  // Add any other properties that your waste item should have
};
const wasteItems: WasteItemType[] = [
  // Wet Waste (20 items)
  { name: "Vegetable peels", category: "wet-waste" },
  { name: "Fruit scraps", category: "wet-waste" },
  { name: "Leftover food", category: "wet-waste" },
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
  { name: "Stale bread", category: "wet-waste" },
  { name: "Wilted flowers", category: "wet-waste" },
  // Dry Waste (25 items)
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
  // Hazardous Waste (15 items)
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
  // E-Waste (15 items)
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
  // Sanitary Waste (15 items)
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
];
const categories: string[] = [
  "wet-waste",
  "dry-waste",
  "hazardous-waste",
  "sanitary-waste",
  "e-waste",
];

export default function Home() {
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
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [correctBin, setCorrectBin] = useState<string | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState<boolean>(false);
  const [completedBin, setCompletedBin] = useState<string | null>(null);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsLoggedIn(isConnected);
  }, [isConnected]);

  useEffect(() => {
    selectRandomItem();
  }, []);

  const selectRandomItem = () => {
    if (availableItems.length === 0) {
      setGameOver(true);
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
      const newLevel = Math.min(binLevels[binCategory] + 10, 100);
      setBinLevels((prev) => ({
        ...prev,
        [binCategory]: newLevel,
      }));
      setScore(score + 1);

      if (newLevel === 100 && !hasShownDialog) {
        setCompletedBin(binCategory);
        setShowWinnerDialog(true);
        setHasShownDialog(true);
      } else {
        selectRandomItem();
      }
    } else {
      setCorrectBin(item.category);
      setGameOver(true);
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
    setGameOver(false);
    setCorrectBin(null);
    setShowWinnerDialog(false);
    setCompletedBin(null);
    setHasShownDialog(false);
    selectRandomItem();
  };

  if (gameOver) {
    return (
      <div className='game-container'>
        <h1>Game Over</h1>
        <p>Your score: {score}</p>
        {correctBin && (
          <p>
            The correct bin was: {correctBin.replace("-", " ").toUpperCase()}
          </p>
        )}
        <button onClick={handleRestartGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className='page-container'>
      <div className='game-container'>
        <h1 className='game-title'>Waste Segregation Game</h1>
        
        <div className='wallet-button-container'>
          <w3m-button balance="hide"/>
        </div>
        
        {isLoggedIn ? (
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
                  onClick={() => handleBinClick(category)}
                  fillLevel={binLevels[category]}
                  isCorrectBin={correctBin === category}
                />
              ))}
            </div>
            {showWinnerDialog && completedBin && (
              <WinnerDialog
                score={score}
                completedBin={completedBin}
                onContinue={handleContinuePlaying}
                onRestart={handleRestartGame}
              />
            )}
          </>
        ) : (
          <div className='login-message'>
            <p>Please connect your wallet to play the game.</p>
          </div>
        )}
      </div>

      <div className='info-section'>
        <h2>Waste is smol pp, gots to sort it.</h2>
        <div className='info-content'>
          <div className='text-content'>
          <p>
              <em>"Be the change, you want to see in the world </em> ~ Mahatma Gandhi" ~ Piyush
            </p>
            <p>
              <strong>This game teaches you how to segregate waste, so that you can:</strong>
            </p>
            <ul>
              <li>
                <em>Reduce the burden on landfills</em>
              </li>
              <li>
                <em>Improve recycling rates</em>
              </li>
              <li>
                <em>Decrease environmental pollution</em>
              </li>
              <li>
                <em>Create opportunities for waste-to-energy projects</em>
              </li>
            </ul>
            
            <p>
              <strong>A major crisis in Indian metros is improper disposal of waste. </strong>
            </p>
            <ul>
              <li>
                <em>Mumbai generates over 11,000 tonnes of waste daily, with only
                27% being processed.</em>
              </li>
              <li>
                <em>Delhi struggles with overflowing landfills, some reaching
                heights of over 65 meters.</em>
              </li>
              <li>
                <em>Bangalore's largest landfill, Mandur, received 1,800 tonnes of
                mixed waste daily before its closure.</em>
              </li>
            </ul>
          </div>
          <div className='image-container'>
            <img src='/trash-image-1.avif' alt='Waste Segregation' />
            <img src='/trash-image-2.jpg' alt='Waste Management' />
          </div>
        </div>
      </div>
    </div>
  );
}
