// use coingecko api to get market cap of a list of coins given coingecko ids

const getMcaps = async (ids) => {
  // get the market cap of a list of coins given coingecko ids
  const _ids = ids.join(",");
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?ids=${_ids}&vs_currency=usd`);
  const _mcaps = await res.json();
  const mcaps = {};
  _mcaps.forEach((coin) => {
    const { id, market_cap, market_cap_rank, fully_diluted_valuation, current_price } = coin;
    mcaps[id] = { id, market_cap, market_cap_rank, fully_diluted_valuation, current_price };
  });
  return mcaps;
};
