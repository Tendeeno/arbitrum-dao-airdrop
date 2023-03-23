import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import airdropTotals from "../airdropTotals.json";
import Table from "../components/table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const getArbPrice = async () => {
    const { data } = await axios.get(
      "https://coins.llama.fi/prices/current/arbitrum:0x912ce59144191c1204e64559fe8253a0e49e6548?searchWidth=4h"
    );
    setArbPrice(
      data.coins["arbitrum:0x912ce59144191c1204e64559fe8253a0e49e6548"].price
    );
  };

  useEffect(() => {
    getArbPrice();
  }, []);

  const [arbPrice, setArbPrice] = useState(1.1);
  return (
    <div className="bg-gray-100 py-12">
      <Table daos={airdropTotals} arbPrice={arbPrice} />
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
