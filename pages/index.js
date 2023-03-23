import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import airdropTotals from "../airdropTotals.json";
import airdropTotals2 from "../airdropTotals2.json";
import Table from "../components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "../components/tabs";
import { getMcaps } from "../utils/getMcap";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [actualArbPrice, setActualArbPrice] = useState(1.1);
  const [customArbPrice, setCustomArbPrice] = useState(1.1);
  const [displayPrice, setDisplayPrice] = useState(1.1);
  const [airdropData, setAirdropData] = useState(airdropTotals2);
  const [daoMcap, setDaoMcap] = useState({});
  const [sortBy, setSortBy] = useState("airdrop-amount-desc");

  // dao-name
  // market-cap
  // airdrop-amount
  // percent-of-market-cap
  useEffect(() => {
    const data = airdropData.filter((dao) => dao.mcap !== 0);
    const exclData = airdropData.filter((dao) => dao.mcap === 0);
    switch (sortBy) {
      case "airdrop-amount-desc":
        setAirdropData(
          [...airdropData].sort((a, b) => b.airdropAmount - a.airdropAmount)
        );
        break;
      case "airdrop-amount-asc":
        setAirdropData(
          [...airdropData].sort((a, b) => a.airdropAmount - b.airdropAmount)
        );
        break;
      case "airdrop-amount-dollars-desc":
        setAirdropData(
          [...airdropData].sort((a, b) => b.airdropAmount - a.airdropAmount)
        );
        break;
      case "airdrop-amount-dollars-asc":
        setAirdropData(
          [...airdropData].sort((a, b) => a.airdropAmount - b.airdropAmount)
        );
        break;
      case "market-cap-desc":
        setAirdropData(
          [...data]
            .sort((a, b) => {
              if (!a.mcap && b.mcap) return -1;
              if (a.mcap && !b.mcap) return 1;
              return b.mcap.market_cap - a.mcap.market_cap;
            })
            .concat(exclData)
        );
        break;
      case "market-cap-asc":
        setAirdropData(
          [...data]
            .sort((a, b) => {
              if (a.mcap && !b.mcap) return -1;
              if (!a.mcap && b.mcap) return 1;
              return a.mcap.market_cap - b.mcap.market_cap;
            })
            .concat(exclData)
        );
        break;
      case "dao-name-desc":
        setAirdropData(
          [...data]
            .sort((a, b) => b.daoName.localeCompare(a.daoName))
            .concat(exclData)
        );
        break;
      case "dao-name-asc":
        setAirdropData(
          [...data]
            .sort((a, b) => a.daoName.localeCompare(b.daoName))
            .concat(exclData)
        );
        break;
      case "percent-of-market-cap-desc":
        setAirdropData(
          [...data]
            .sort((a, b) => {
              if (!a.mcap && b.mcap) return -1;
              if (a.mcap && !b.mcap) return 1;
              const arbPrice =
                activeTab === 0 ? actualArbPrice : customArbPrice;
              const AairdropAmountDollars = a.airdropAmount * arbPrice;
              const ApercentOfMcap =
                (AairdropAmountDollars / a.mcap.market_cap) * 100;
              const BairdropAmountDollars = b.airdropAmount * arbPrice;
              const BpercentOfMcap =
                (BairdropAmountDollars / b.mcap.market_cap) * 100;
              return BpercentOfMcap - ApercentOfMcap;
            })
            .concat(exclData)
        );
        break;
      case "percent-of-market-cap-asc":
        setAirdropData(
          [...data]
            .sort((a, b) => {
              if (a.mcap && !b.mcap) return -1;
              if (!a.mcap && b.mcap) return 1;
              const arbPrice =
                activeTab === 0 ? actualArbPrice : customArbPrice;
              const AairdropAmountDollars = a.airdropAmount * arbPrice;
              const ApercentOfMcap =
                (AairdropAmountDollars / a.mcap.market_cap) * 100;

              const BairdropAmountDollars = b.airdropAmount * arbPrice;
              const BpercentOfMcap =
                (BairdropAmountDollars / b.mcap.market_cap) * 100;

              return ApercentOfMcap - BpercentOfMcap;
            })
            .concat(exclData)
        );
        break;
    }
  }, [sortBy]);

  const setSort = (sortType) => {
    setSortBy(sortType);
  };

  useEffect(() => {
    // fetch arb price every 7 seconds
    getArbPrice();
    const interval = setInterval(() => getArbPrice(), 7000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const ids =
        airdropData
          .map((dao) => dao["cg-id"])
          .filter((id) => id !== "" && id !== "null") || [];
      const mcaps = await getMcaps(ids);

      const updatedDaos = airdropData.map((dao) => {
        const mcap = mcaps[dao["cg-id"]] || 0;
        return {
          ...dao,
          mcap,
        };
      });

      setAirdropData(updatedDaos);
    })();
  }, []);

  console.log(airdropData);

  useEffect(() => {
    // if we are on the "actual" tab, set the display price to the actual arb price
    if (activeTab === 0) {
      setDisplayPrice(actualArbPrice);
    }
  }, [actualArbPrice]);

  const onChange = (idx) => {
    setActiveTab(idx);
  };

  useEffect(() => {
    if (activeTab === 0) {
      setDisplayPrice(actualArbPrice);
    } else {
      setDisplayPrice(customArbPrice);
    }
  }, [activeTab]);

  const getArbPrice = async () => {
    console.log("getting price");
    const { data } = await axios.get(
      "https://coins.llama.fi/prices/current/arbitrum:0x912ce59144191c1204e64559fe8253a0e49e6548?searchWidth=4h"
    );
    setActualArbPrice(
      data.coins["arbitrum:0x912ce59144191c1204e64559fe8253a0e49e6548"].price
    );
  };

  const handleChange = (e) => {
    setCustomArbPrice(e.target.value);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="fixed right-8 bottom-8 z-50">
        <div className="flex justify-start items-center bg-white shadow-lg text-black rounded-full py-2 px-3 gap-1">
          <div>Made by</div>
          <a href="https://twitter.com/0xstrobe" target="_blank" rel="noopener">
            <Image
              src="/strobie.jpeg"
              width="24"
              height="24"
              alt="logo"
              className="rounded-full overflow-hidden"
            />
          </a>
          {/* <div className="font-bold">Strobie</div> */}
          {/* <div>and</div> */}
          <a
            href="https://twitter.com/tendeeno_"
            target="_blank"
            rel="noopener">
            <Image
              src="/tendeeno.jpeg"
              width="24"
              height="24"
              alt="logo"
              className="rounded-full overflow-hidden"
            />
          </a>
          {/* <div className="font-bold">Tendeeno</div> */}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[320px] w-full ">
          <Tabs onChange={onChange} />
          {activeTab === 0 ? (
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                ARB price
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex gap-1">
                <Image src="/arb.webp" alt="arb token" width="32" height="32" />
                ${actualArbPrice}
              </dd>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                ARB price
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex gap-1">
                <Image src="/arb.webp" alt="arb token" width="32" height="32" />
                <div className="flex">
                  <div>$</div>
                  <input
                    type="text"
                    value={customArbPrice}
                    onChange={handleChange}
                    className="bg-gray-100 w-32 rounded"
                  />
                </div>
              </dd>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-scroll overflow-y-visible">
        <Table
          sortBy={sortBy}
          setSortBy={setSortBy}
          daos={airdropData}
          arbPrice={activeTab === 0 ? actualArbPrice : customArbPrice}
        />
      </div>
    </div>
  );
}
