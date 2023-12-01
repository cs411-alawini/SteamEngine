import React from "react";

import {
  Slider,
  Typography,
  Select,
  MenuItem,
  Stack,
  FormGroup,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import "./FilterBar.css";

const attributes = [
  "GenreIsNonGame",
  "GenreIsIndie",
  "GenreIsAction",
  "GenreIsAdventure",
  "GenreIsCasual",
  "GenreIsStrategy",
  "GenreIsRPG",
  "GenreIsSimulation",
  "GenreIsEarlyAccess",
  "GenreIsFreeToPlay",
  "GenreIsSports",
  "GenreIsRacing",
  "GenreIsMassivelyMultiplayer",
  "CategoryMMO",
  "CategoryCoop",
  "CategoryVRSupport",
  "ControllerSupport",
  "CategorySinglePlayer",
  "CategoryMultiplayer",
  "CategoryInAppPurchase",
  "CategoryIncludeLevelEditor",
];

function FilterBar({
  tags,
  setTags,
  yearRange,
  setYearRange,
  mac,
  setMac,
  windows,
  setWindows,
  linux,
  setLinux,
  priceRange,
  setPriceRange,
  requiredAge,
  setRequiredAge,
  metaCriticRange,
  setMetaCriticRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  const handleSliderChange = (
    event,
    newValue,
    activeThumb,
    value,
    setValue,
    minDistance
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className="filter-bar-container">
      <h2>Advanced Search</h2>
      <Typography id="tags-checkbox" gutterBottom>
        Tags
      </Typography>
      <div className="tag-container">
        {attributes.map((attribute) => {
          return (
            <FormControlLabel
              key={attribute}
              control={
                <Checkbox
                  checked={tags.includes(attribute)}
                  onChange={({ target }) => {
                    if (target.checked && !tags.includes(attribute)) {
                      setTags([...tags, attribute]);
                    } else if (!target.checked && tags.includes(attribute)) {
                      setTags(tags.filter((tag) => tag !== attribute));
                    }
                  }}
                  size="small"
                />
              }
              label={<Typography sx={{ fontSize: 8 }}>{attribute}</Typography>}
            />
          );
        })}
      </div>
      <Typography id="platform-switch" gutterBottom>
        Platform
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={!!mac}
              onChange={({ target }) => setMac(Number(target.checked))}
            />
          }
          label="Mac"
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!windows}
              onChange={({ target }) => setWindows(Number(target.checked))}
            />
          }
          label="Windows"
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!linux}
              onChange={({ target }) => setLinux(Number(target.checked))}
            />
          }
          label="Linux"
        />
      </FormGroup>

      <Typography id="requiredage-slider" gutterBottom>
        RequiredAge
      </Typography>
      <Slider
        value={requiredAge}
        onChange={(e, newValue) => setRequiredAge(newValue)}
        valueLabelDisplay="auto"
        min={8}
        max={21}
      />

      <Typography id="year-slider" gutterBottom>
        Release Year
      </Typography>
      <Slider
        value={yearRange}
        onChange={(event, newValue, activeThumb) =>
          handleSliderChange(
            event,
            newValue,
            activeThumb,
            yearRange,
            setYearRange,
            5
          )
        }
        valueLabelDisplay="auto"
        disableSwap
        min={1950}
        max={2023}
      />

      <Typography id="price-slider" gutterBottom>
        Price
      </Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue, activeThumb) =>
          handleSliderChange(
            event,
            newValue,
            activeThumb,
            priceRange,
            setPriceRange,
            5
          )
        }
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={150}
      />

      <Typography id="metacritic-slider" gutterBottom>
        MetaCritic
      </Typography>
      <Slider
        value={metaCriticRange}
        onChange={(event, newValue, activeThumb) =>
          handleSliderChange(
            event,
            newValue,
            activeThumb,
            metaCriticRange,
            setMetaCriticRange,
            5
          )
        }
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={100}
      />

      <Typography id="sort" gutterBottom>
        Sort
      </Typography>
      <Stack direction="row" spacing={2}>
        <Select
          id="sort-by-select"
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
          variant="standard"
        >
          <MenuItem value={"MetaCritic"}>MetaCritic</MenuItem>
          <MenuItem value={"ReleaseDate"}>Release Date</MenuItem>
          <MenuItem value={"GameName"}>Title</MenuItem>
          <MenuItem value={"Price"}>Price</MenuItem>
          <MenuItem value={"PlayerEstimate"}>Player Count</MenuItem>
        </Select>
        <Select
          id="sort-order-select"
          value={sortOrder}
          label="Sort Order"
          onChange={(e) => setSortOrder(e.target.value)}
          variant="standard"
        >
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DESC"}>Descending</MenuItem>
        </Select>
      </Stack>
    </div>
  );
}

export default FilterBar;
