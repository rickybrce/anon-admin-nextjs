import { Api } from ".";

export function getNumUserGames(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/number_games",
    type: "GET",
    auth: true
  });
}

export function getUserSumPrizePool(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/active_prizepool",
    type: "GET",
    auth: true
  });
}

export function getUserPlacedBetsActiveGames(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/placed_bets_active_games",
    type: "GET",
    auth: true
  });
}

export function getBurTokenDlrRatio(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/burn_token_dlr_ratio",
    type: "GET",
    auth: true
  });
}

export function getTokenPrice(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/token_price",
    type: "GET",
    auth: true
  });
}

export function getTopPlayers(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/top_players",
    type: "GET",
    auth: true
  });
}

export function getTokenBurnedPercentage(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/token_burned_percentage",
    type: "GET",
    auth: true
  });
}

export function getHotGame(): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/hot_game",
    type: "GET",
    auth: true
  });
}

export function setHotGame (
  hot_game_id: any,
): any {
  const api = new Api();
  return api.request({
    endpoint: "stats/hot_game/"+hot_game_id,
    type: "POST",
    auth: true,
  });
}

