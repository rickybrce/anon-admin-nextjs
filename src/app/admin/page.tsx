"use client"; // This is a client component
import Image from "next/image";
import content from "../../../public/static/locales/en/common.json";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "next/navigation";
import ButtonMenu from "../components/buttons/ButtonMenu";
import { deleteGame, getActiveGames, getGame, getGames } from "../api/games";
import ButtonPlay from "../components/buttons/ButtonPlay";
import UpdateGame from "./components/UpdateGame";
import CreateGame from "./components/CreateGame";
import CreateCoin from "./components/CreateCoin";
import UpdateCoin from "./components/UpdateCoin";
import PopupPlaceBet from "../components/PopupPlaceBet";
import { getHotGame, setHotGame } from "../api/stats";

export default function BurnPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [games, setGames] = useState<any[]>([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateCoinSuccess, setUpdateCoinSuccess] = useState(false);
  const [createCoinSuccess, setCreateCoinSuccess] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [selectedGameCoin, setSelectedGameCoin] = useState<any>(null);
  const [selectedGameCoinCreate, setSelectedGameCoinCreate] =
    useState<any>(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createGame, setCreateGame] = useState<any>(false);
  const [createCoin, setCreateCoin] = useState<any>(false);
  const [updateCoin, setUpdateCoin] = useState<any>(false);
  const [deleteGamePopup, setDeleteGamePopup] = useState<any>(null);
  const [hotGameS, setHotGameS] = useState<any>(null);
  const [displayHotGame, setDisplayHotGame] = useState<any>(null);
  const [activeGames, setActiveGames] = useState<any>(null);
  const [hotGameSet, setHotGameSet] = useState(false);

  //Check if logged in
  useEffect(() => {
    //Get active games
    (async () => {
      const activegames = await getActiveGames(0, 100);
      setActiveGames(activegames);
    })();
    (async () => {
      const gethotgame = await getHotGame();
      //Get single game data
      const game = await getGame(gethotgame);
      setHotGameS(game);
    })();

    (async () => {
      const token = await Preferences.get({ key: "token" });
      if (token.value !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        //Redirect to login
        router.push("/login");
      }
    })();
  }, [createGame, createCoin, updateCoin]);
  //Log out
  async function handlelogout() {
    console.log("logout");
    //Remove token
    await Preferences.remove({ key: "token" });
    //Remove active character
    await Preferences.remove({ key: "activeCharacterId" });
    await Preferences.remove({ key: "activeCharacterName" });
    await Preferences.remove({ key: "activeCharacterNickname" });
    await Preferences.remove({ key: "activeCharacterImage" });
    await Preferences.remove({ key: "activeCharacterDescription" });
    await Preferences.remove({ key: "activeCharacterIsUsed" });
    //Redirect to login
    router.push("/login");
  }

  useEffect(() => {
    //Get games
    (async () => {
      const games = await getGames(0, 100);
      setGames(games);
    })();
  }, [deleteSuccess, updateSuccess, createCoinSuccess, updateCoinSuccess]);

  const handleDeleteGame = (id: number) => {
    //Delete game
    deleteGame(id)
      .then(async (response: any) => {
        console.log(response);
        console.log("Game deleted");
        setDeleteSuccess(true);
        const timer = setTimeout(() => {
          setDeleteSuccess(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleNewGame = () => {
    setCreateGame(!createGame);
    setCreateCoin(false);
  };
  const handleCreateCoin = (id: any) => {
    if (selectedGameCoinCreate === id) {
      setSelectedGameCoinCreate(null);
    } else {
      setSelectedGameCoinCreate(id);
    }
    setSelectedGameCoin(null);
  };
  const handleUpdateCoin = (id: any) => {
    if (selectedGameCoin === id) {
      setSelectedGameCoin(null);
    } else {
      setSelectedGameCoin(id);
    }
    setSelectedGameCoinCreate(null);
  };

  const handleNewGameCreated = () => {
    //setCreateGame(false);
  };
  const handleCreateCoinCreated = () => {
    //setCreateCoin(false);
  };

  const handleUpdateGame = (id: number) => {
    if (selectedGame === id) {
      setSelectedGame(null);
    } else {
      setSelectedGame(id);
    }
  };

  //Handle hot game
  const handleSetHotGame = (id: any) => {
    const hot_game_id = id;
   setHotGame(hot_game_id)
   .then(async (response: any) => {
    console.log(response);
    setHotGameSet(true);
    (async () => {
      const gethotgame = await getHotGame();
      //Get single game data
      const game = await getGame(gethotgame);
      setHotGameS(game);
    })();
    console.log("Hot game set");
  })
  };

  return (
    <main className="">
      {loggedIn && (
        <div className="max-w-[800px] mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl">Admin area</div>
            <div className="">
              <ButtonMenu
                className=""
                onClick={() => (handlelogout ? handlelogout() : "")}
              >
                Logout
              </ButtonMenu>
            </div>
          </div>
          <div className="border-t mt-6 py-6 border-blue-500">
            <div className="flex justify-between items-center flex-wrap mb-10">
              <div className="text-xl">Hot Game</div>
              <div>{hotGameS?.name}</div>
            </div>
            <ButtonPlay
              onClick={() => {
                setDisplayHotGame(!displayHotGame), setHotGameSet(false);
              }}
              className="mr-2"
            >
              Set hot game
            </ButtonPlay>
            {displayHotGame && (
              <div>
                <div>
                  {hotGameSet && (
                    <div className="text-green-200 mt-4 text-center text-lg">Hot game set !!!</div>
                  )}
                </div>
                {activeGames &&
                  activeGames.map((game: any, index: number) => (
                    <div
                      key={index}
                      className="mt-4 border-b pb-4 border-cyan-500"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          {game.id}. {game.name}
                        </div>
                        <div>
                          <ButtonPlay
                            onClick={() => {
                              handleSetHotGame(game.id);
                            }}
                            className="mr-2"
                          >
                            Set
                          </ButtonPlay>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="border-t mt-6 py-6 border-blue-500">
            <div className="flex justify-between items-center flex-wrap mb-10">
              <div className="text-xl">Games</div>
              <div>
                <ButtonMenu
                  className="mr-2"
                  onClick={() => (handleNewGame ? handleNewGame() : "")}
                >
                  {createGame === false ? (
                    <span>Create game</span>
                  ) : (
                    <span>Back to games</span>
                  )}
                </ButtonMenu>
              </div>
            </div>
            {createGame ? (
              <CreateGame handleCreateGame={() => handleNewGameCreated()} />
            ) : (
              <>
                {games
                  .sort((a, b) => a.id - b.id)
                  .map((game, index) => (
                    <div
                      key={index}
                      className="mt-4 border-b pb-4 border-cyan-500"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          {game.id}. {game.name}
                        </div>
                        <div className="text-left">
                          <div className="relative">
                            <ButtonPlay
                              onClick={() => {
                                handleUpdateGame(game.id);
                              }}
                              className="mr-2"
                            >
                              Update game
                            </ButtonPlay>
                            <ButtonPlay
                              onClick={() => {
                                setDeleteGamePopup(game.id);
                              }}
                              red={true}
                            >
                              Delete game
                            </ButtonPlay>
                            {deleteGamePopup === game.id && (
                              <PopupPlaceBet
                                text={content.general.are_you_sure}
                                onClick={() => setDeleteGamePopup(null)}
                                cta_label={content.general.delete}
                                handleBet={() => handleDeleteGame(game.id)}
                              />
                            )}
                          </div>
                          <div className="mt-2 flex justify-end">
                            <ButtonPlay
                              onClick={() => {
                                handleUpdateCoin(game.id);
                              }}
                              className="mr-2"
                            >
                              Update coin
                            </ButtonPlay>
                            <ButtonPlay
                              onClick={() => {
                                handleCreateCoin(game.id);
                              }}
                            >
                              Create coin
                            </ButtonPlay>
                          </div>
                        </div>
                      </div>
                      {game.id === selectedGame && (
                        <UpdateGame
                          game={game}
                          handleUGame={() => setUpdateSuccess(true)}
                        />
                      )}
                      {game.id === selectedGameCoinCreate && (
                        <CreateCoin
                          gameId={game.id}
                          handleCreateCoin={() => setCreateCoinSuccess(true)}
                        />
                      )}
                      {game.id === selectedGameCoin && (
                        <UpdateCoin
                          gameId={game.id}
                          handleUCoin={() => setUpdateCoinSuccess(true)}
                          createCoin={createCoinSuccess}
                        />
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
