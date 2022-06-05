import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    [
        "Month",
        "Покупки",

    ],
    ["2018",  938,   ],
    ["2019",  1120,  ],
    ["2020",  1167,   ],
    ["2021",  1110,   ],
    ["2022",  2100,  ],
];

export const options = {
    title: "Покупки пользователя",
    vAxis: { title: "Сумма" },
    hAxis: { title: "Год" },
    seriesType: "bars",
};

export function FUCK() {
    return (
        <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}
