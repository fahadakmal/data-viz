import React from 'react';
import * as d3 from 'd3';

const COLORS = d3.schemeCategory10;

function D3Chart({ files, selections }) {
  const width = 600;
  const height = 350;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  return (
    <div>
      {files.map((file, fileIdx) => {
        const sel = selections[fileIdx];
        if (!sel || !sel.x || !sel.y.length) return null;
        const data = file.data.filter(row => sel.x in row && sel.y.every(y => y in row));
        if (!data.length) return null;

        // X scale
        const xVals = data.map(d => +d[sel.x]);
        const xScale = d3.scaleLinear()
          .domain(d3.extent(xVals))
          .range([margin.left, width - margin.right]);

        // Y scale (all Y columns together)
        const yVals = data.flatMap(d => sel.y.map(yCol => +d[yCol]));
        const yScale = d3.scaleLinear()
          .domain(d3.extent(yVals))
          .nice()
          .range([height - margin.bottom, margin.top]);

        // Axis ticks
        const xTicks = xScale.ticks(8);
        const yTicks = yScale.ticks(8);

        // Line generator (returns SVG path string)
        const makeLine = yCol => d3.line()
          .x(d => xScale(+d[sel.x]))
          .y(d => yScale(+d[yCol]))(data);

        return (
          <svg
            key={file.name}
            width={width}
            height={height}
            style={{ background: '#fff', marginBottom: 30, boxShadow: '0 2px 8px #eee' }}
          >
            {/* X Axis */}
            <g>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={height - margin.bottom}
                y2={height - margin.bottom}
                stroke="#333"
              />
              {xTicks.map((tick, i) => (
                <g key={i}>
                  <line
                    x1={xScale(tick)}
                    x2={xScale(tick)}
                    y1={height - margin.bottom}
                    y2={height - margin.bottom + 6}
                    stroke="#333"
                  />
                  <text
                    x={xScale(tick)}
                    y={height - margin.bottom + 20}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#333"
                  >
                    {tick}
                  </text>
                </g>
              ))}
              {/* X axis label */}
              <text
                x={(width) / 2}
                y={height - 10}
                textAnchor="middle"
                fontWeight="bold"
                fontSize={14}
                fill="#333"
              >
                {sel.x}
              </text>
            </g>
            {/* Y Axis */}
            <g>
              <line
                x1={margin.left}
                x2={margin.left}
                y1={margin.top}
                y2={height - margin.bottom}
                stroke="#333"
              />
              {yTicks.map((tick, i) => (
                <g key={i}>
                  <line
                    x1={margin.left - 6}
                    x2={margin.left}
                    y1={yScale(tick)}
                    y2={yScale(tick)}
                    stroke="#333"
                  />
                  <text
                    x={margin.left - 10}
                    y={yScale(tick) + 4}
                    textAnchor="end"
                    fontSize={12}
                    fill="#333"
                  >
                    {tick}
                  </text>
                </g>
              ))}
              {/* Y axis label */}
              <text
                x={15}
                y={height / 2}
                textAnchor="middle"
                fontWeight="bold"
                fontSize={14}
                fill="#333"
                transform={`rotate(-90 15,${height / 2})`}
              >
                {sel.y.join(', ')}
              </text>
            </g>
            {/* Lines and points for each Y */}
            {sel.y.map((yCol, i) => (
              <g key={yCol}>
                {/* Line */}
                <path
                  d={makeLine(yCol)}
                  fill="none"
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                />
                {/* Points */}
                {data.map((d, j) => (
                  <circle
                    key={j}
                    cx={xScale(+d[sel.x])}
                    cy={yScale(+d[yCol])}
                    r={3}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </g>
            ))}
            {/* Title */}
            <text
              x={width / 2}
              y={margin.top - 10}
              textAnchor="middle"
              fontWeight="bold"
              fontSize={16}
              fill="#222"
            >
              {file.name}
            </text>
          </svg>
        );
      })}
    </div>
  );
}

export default D3Chart; 