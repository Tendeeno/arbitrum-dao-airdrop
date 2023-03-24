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

const TableHeading = ({ sortKeyName, displayName, handleClick, sortBy }) => (
  <th
    onClick={() => handleClick(sortKeyName)}
    scope="col"
    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
  >
    <div className="flex items-center gap-1">
      { displayName }
      {sortBy === `${sortKeyName}-asc` && <Up />}
      {sortBy === `${sortKeyName}-desc` && <Down />}
    </div>
  </th>
)

const Table = ({ daos, arbPrice, setSortBy, sortBy }) => {

  const handleClick = (columnName) => {
    if (sortBy.includes(columnName)) {
      if (sortBy.includes("desc")) {
        setSortBy(columnName + "-asc");
      } else {
        setSortBy(columnName + "-desc");
      }
    } else {
      setSortBy(columnName + "-desc");
    }
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
                    <TableHeading sortKeyName="dao-name" handleClick={handleClick} displayName="DAO Name" sortBy={sortBy} />
                    <TableHeading sortKeyName="market-cap" handleClick={handleClick} displayName="DAO Token Market Cap" sortBy={sortBy} />
                    <TableHeading sortKeyName="airdrop-amount" handleClick={handleClick} displayName="Airdrop Amount (tokens)" sortBy={sortBy} />
                    <TableHeading sortKeyName="airdrop-amount-dollars" handleClick={handleClick} displayName="Airdrop Amount ($)" sortBy={sortBy} />
                    <TableHeading sortKeyName="percent-of-market-cap" handleClick={handleClick} displayName="Airdrop % of market cap" sortBy={sortBy} />
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
