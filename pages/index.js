import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import airdropTotals from "../airdropTotals.json";
import Table from "../components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "../components/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [actualArbPrice, setActualArbPrice] = useState(1.1);
  const [customArbPrice, setCustomArbPrice] = useState(1.1);
  const [displayPrice, setDisplayPrice] = useState(1.1);

  useEffect(() => {
    // fetch arb price every 7 seconds
    getArbPrice();
    const interval = setInterval(() => getArbPrice(), 7000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
      <div className="container mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[25%] ">
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
      <Table
        daos={airdropTotals}
        arbPrice={activeTab === 0 ? actualArbPrice : customArbPrice}
      />
      {airdropTotals.map(({ id, daoName, airdropAmount }) => {
        return (
          <div key={id}>
            <div>{id}</div>
            <div>{daoName}</div>
            <div>{airdropAmount}</div>
          </div>
        );
      })}
    </div>
  );
}
