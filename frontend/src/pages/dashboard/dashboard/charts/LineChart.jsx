import React from "react";
import {Chart} from "react-google-charts";
import styled from "styled-components/macro";

export function LineChart(props) {
    const {
        data,
        color,
        title
    } = props

    const options = {
        title: title,
        hAxis: {title: "Год", titleTextStyle: {color: "#333"}},
        vAxis: {minValue: 5},
        chartArea: {width: "70%", height: "70%"},
        tooltip: { isHtml: true, trigger: "visible" }
    };

    return (
        <ChartWrapper>
            <Chart
                chartType="AreaChart"
                width="750px"
                height="400px"
                data={data ? data : null}
                options={options}
            />
        </ChartWrapper>

    );
}

const ChartWrapper = styled.div`
  margin-top: 5px;
`;

