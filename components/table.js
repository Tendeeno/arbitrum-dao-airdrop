// const daos = [
//   {
//     name: "Lindsay Walton",
//     title: "Front-end Developer",
//     department: "Optimization",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//     image:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   // More daos...
// ];

import { useEffect, useState } from "react";
import { getMcaps } from "../utils/getMcap";
import Up from "./icons/up";
import Down from "./icons/down";

const Table = ({ daos, arbPrice, setSortBy, sortBy }) => {
  const handleClick = (columnName) => {
    console.log(sortBy);
    if (sortBy.includes(columnName)) {
      if (sortBy.includes("desc")) {
        setSortBy(columnName + "-asc");
      } else {
        setSortBy(columnName + "-desc");
      }
    } else {
      setSortBy(columnName + "-desc");
    }
    console.log(columnName);
  };

  return (
    <div className="sm:px-6 lg:px-8 container sm:mx-auto px-12">
      <div className="mt-8">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-x-scroll">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      onClick={() => handleClick("dao-name")}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                      <div className="flex items-center gap-1">
                        DAO Name
                        {sortBy.includes("dao-name-asc") && <Up />}
                        {sortBy.includes("dao-name-desc") && <Down />}
                      </div>
                    </th>
                    <th
                      onClick={() => handleClick("market-cap")}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                      <div className="flex items-center gap-1">
                        DAO Token Market Cap
                        {sortBy.includes("market-cap-asc") && <Up />}
                        {sortBy.includes("market-cap-desc") && <Down />}
                      </div>
                    </th>
                    <th
                      onClick={() => handleClick("airdrop-amount")}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                      <div className="flex items-center gap-1">
                        Airdrop Amount (tokens)
                        {sortBy.includes("airdrop-amount-asc") && <Up />}
                        {sortBy.includes("airdrop-amount-desc") && <Down />}
                      </div>
                    </th>
                    <th
                      onClick={() => handleClick("airdrop-amount-dollars")}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                      <div className="flex items-center gap-1">
                        Airdrop Amount ($)
                        {sortBy.includes("airdrop-amount-dollars-asc") && (
                          <Up />
                        )}
                        {sortBy.includes("airdrop-amount-dollars-desc") && (
                          <Down />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleClick("percent-of-market-cap")}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                      <div className="flex items-center gap-1">
                        airdrop % of market cap
                        {sortBy.includes("percent-of-market-cap-asc") && <Up />}
                        {sortBy.includes("percent-of-market-cap-desc") && (
                          <Down />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {daos.map((dao) => {
                    const airdropAmountDollars = dao.airdropAmount * arbPrice;
                    return (
                      <tr key={dao.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm ">
                          <div className="flex items-center">
                            <div className="">
                              <div className="font-medium text-gray-900">
                                {dao.daoName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm ">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">
                              {dao.mcap && dao.mcap.market_cap.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {Number(
                            dao.airdropAmount.replace(",", "")
                          ).toLocaleString()}
                          {/* <div className="text-gray-900">{person.title}</div>
                        <div className="text-gray-500">{person.department}</div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {airdropAmountDollars.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="font-medium text-gray-900">
                            {dao.mcap &&
                              (
                                (airdropAmountDollars / dao.mcap.market_cap) *
                                100
                              ).toLocaleString()}
                            %
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
