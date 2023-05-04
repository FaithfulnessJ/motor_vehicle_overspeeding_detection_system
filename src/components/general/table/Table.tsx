import React, { ReactNode } from "react";

type TableProps = {
  headers: any[];
  children?: ReactNode;
  headerClass?: string;
  footer: JSX.Element;
};

const Table = ({
  headers,
  children,
  headerClass,
  footer,
}: TableProps): JSX.Element => {
  return (
    <div className=" w-full">
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white">
          <thead className="bg-white">
            <tr>
              {headers.map((h, index) => (
                <th
                  className={`text-left py-3 px-4 capitalize font-semibold text-lg ${headerClass}`}
                  key={index}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-normal text-sm">{children}</tbody>
        </table>

        <div className="w-full bg-white pt-5 pb-3 px-2">{footer}</div>
      </div>
    </div>
  );
};

export default Table;
