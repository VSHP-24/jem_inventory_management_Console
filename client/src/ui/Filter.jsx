import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HiChevronDown, HiOutlineXMark } from "react-icons/hi2";

import Button from "./Button";
import SelectedFilter from "./SelectedFilter";

import { device } from "../utils/devices";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;

  @media ${device.laptopL} {
    font-size: 1.2rem;
    height: 4rem;
    max-width: 20rem;
  }

  @media ${device.tablet} {
    max-width: 100%;
  }
`;

const StyledFilteredItemsContainer = styled.div`
  border: 2px solid var(--color-grey-900);
  border-radius: 7px;
  width: 100%;
  max-width: 65rem;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const StyledFilterButtons = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  padding-left: 0.2rem;
  cursor: pointer;
  border: none;
  padding: 0.2rem;
  background-color: var(--color-gold-100);
  text-decoration: none;
  display: inline-block;

  @media ${device.laptopL} {
    font-size: 2rem;
  }
`;

const StyledDivider = styled.div`
  font-size: 2.5rem;

  @media ${device.laptopL} {
    font-size: 2rem;
  }
`;

const StyledOptionsContainer = styled.div`
  border: 2px solid var(--color-gold-700);
  border-radius: 7px;
  background-color: var(--color-gold-400);
  position: absolute;
  width: auto;
  max-width: 65rem;
  max-height: 20rem;
  overflow: auto;

  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 100;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  accent-color: var(--color-grey-900);
  color: var(--color-grey-900);

  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    padding: 1.2rem;
  }

  @media ${device.mobileM} {
    grid-template-columns: 1fr;
    width: fit-content;
    padding-right: 0.5rem;
  }
`;

const StyledIndividualFilterContainer = styled.div``;

const StyledIndividualOptionContainer = styled.div`
  color: ${(props) =>
    props.children[0].props.disabled === true
      ? "var(--color-grey-700)"
      : "var(--color-grey-900)"};
`;

const StyledIndividualOption = styled.label`
  padding-left: 0.5rem;
  font-weight: 400;
  font-size: 1.5rem;

  @media ${device.laptopL} {
    font-size: 1.2rem;
  }

  @media ${device.mobileM} {
    font-size: 1rem;
  }
`;

const StyledFilterTitle = styled.p`
  text-decoration: underline;
  font-weight: 600;
`;

function Filter({ filterList = [] }) {
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState();
  let selectedFilterLabels = [];

  // IF SELECTED FILTER EXISTS, THIS LINE GETS ALL THE LABELS / NAMES OF THE SELECTED FILTERS
  if (selectedFilters) {
    for (const [key] of Object.entries(selectedFilters)) {
      selectedFilterLabels.push(...selectedFilters[key].labels);
    }
  }

  // WHENEVER, NEW FILTERS ARE SELECTED, ID IS ADDED TO SEARCHPARAMS, SO SELECTED FILTERS GETS UPDATED
  useEffect(() => {
    const tempFilters = {};
    filterList.map((filter) => {
      if (searchParams.get(filter.filterField)) {
        tempFilters[filter.filterField] = {
          values:
            searchParams.get(filter.filterField)?.split(",") ||
            searchParams.get(filter.filterField),
        };
      }

      // THIS CHOOSES THE ID & LABEL/NAME , OF THE OPTIONS
      filter.filterOptions.map((option) => {
        if (tempFilters?.[filter.filterField]?.values.includes(option.id)) {
          if (!tempFilters[filter.filterField].labels)
            tempFilters[filter.filterField].labels = [option.name];
          else tempFilters[filter.filterField].labels.push(option.name);
        }
        return option;
      });

      if (!tempFilters[filter.filterField]) {
        tempFilters[filter.filterField] = {
          labels: [],
          values: [],
        };
      }
      return filter;
    });
    setSelectedFilters(tempFilters);
  }, [filterList, searchParams]);

  function handleShowFilterOptionsClick(e) {
    setShowOptions((cur) => !cur);

    // THIS SETS THE POSITION , JUST BELOW THE FILTER CONTAINER
    const rect = e.target.closest("#parent-container").getBoundingClientRect();
    setPosition({
      x: rect.x,
      y: rect.bottom + 20,
    });
  }

  // THIS CLEARS ALL THE SELECTED FILTERS
  function handleClearOptionsClick() {
    setSearchParams();
    setSelectedFilters();
  }

  //THIS DESELECTS THE SELECTED FILTERS SHOWN IN THE FILTER CONTAINER
  function handleIndividualOptionsClick(filter) {
    let filterToBeDeleted;
    filterList.map((filterType) => {
      filterType.filterOptions.filter((option) => {
        if (option.name === filter) {
          filterToBeDeleted = {
            label: option.name,
            value: option.id,
            filterField: filterType.filterField,
          };
        }
        return filterToBeDeleted;
      });
      return filterType;
    });

    let selectedFilters =
      searchParams.get(filterToBeDeleted.filterField)?.split(",") ||
      searchParams.get(filterToBeDeleted.filterField) ||
      [];
    selectedFilters = selectedFilters.filter(
      (cur) => cur !== filterToBeDeleted.value
    );

    if (selectedFilters.length > 0) {
      searchParams.set(filterToBeDeleted.filterField, selectedFilters);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(filterToBeDeleted.filterField);
      setSearchParams(searchParams);
    }
  }

  //THIS SELECTS AND DESELECTS THE FILTERS
  function handleOptionsClick(option, filterType) {
    let selectedFilters =
      searchParams.get(filterType.filterField)?.split(",") ||
      searchParams.get(filterType.filterField) ||
      [];

    // IF SELECTED FILTER IS NOT SELECTED ,IT WILL BE SELECTED HERE
    if (!selectedFilters.includes(option.id)) {
      selectedFilters.push(option.id);

      // IF SELECTED FILTER IS ALREADY SELECTED ,IT WILL BE DESELECTED HERE
    } else if (selectedFilters.includes(option.id)) {
      selectedFilters = selectedFilters.filter((cur) => cur !== option.id);
    }

    if (selectedFilters.length > 0) {
      searchParams.set(filterType.filterField, selectedFilters);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(filterType.filterField);
      setSearchParams(searchParams);
    }
  }

  return (
    <StyledContainer>
      <StyledFilteredItemsContainer id="parent-container">
        <SelectedFilter
          selectedFilterLabels={selectedFilterLabels}
          onHandleIndividualOptionsClick={handleIndividualOptionsClick}
        />

        <StyledFilterButtons>
          {selectedFilterLabels.length >= 1 && (
            <StyledButton
              size="small"
              variation="danger"
              type="clear"
              onClick={handleClearOptionsClick}
            >
              <HiOutlineXMark />
            </StyledButton>
          )}

          <StyledDivider>|</StyledDivider>

          <StyledButton
            size="small"
            variation="primary"
            type="downArrow"
            onClick={handleShowFilterOptionsClick}
          >
            <HiChevronDown />
          </StyledButton>
        </StyledFilterButtons>
      </StyledFilteredItemsContainer>

      {showOptions && (
        <StyledOptionsContainer position={position}>
          {filterList.map((filterType) => (
            <StyledIndividualFilterContainer key={filterType.filterTitle}>
              <StyledFilterTitle>{filterType.filterTitle}</StyledFilterTitle>

              {filterType.filterOptions.map((optionType) => (
                <StyledIndividualOptionContainer key={optionType.id}>
                  <input
                    type="checkbox"
                    id={optionType.id}
                    // IF PARENT ELEMENT ISN'T SELECTED, CHILD ELEMENT WILL BE DISABLED
                    disabled={
                      filterType.parentElement &&
                      !selectedFilters?.[
                        filterType.parentElement
                      ]?.values.includes(
                        optionType[filterType?.parentElement]?.id
                      )
                    }
                    // IF FILTER IDs ARE IN SEARCHPARAMS , IT WILL BE CHECKED AUTOMATICALLY
                    checked={searchParams
                      ?.get(filterType.filterField)
                      ?.includes(optionType.id)}
                    name={optionType.name}
                    onChange={() => handleOptionsClick(optionType, filterType)}
                  />

                  <StyledIndividualOption htmlFor={optionType.name}>
                    {optionType.name}
                  </StyledIndividualOption>
                </StyledIndividualOptionContainer>
              ))}
            </StyledIndividualFilterContainer>
          ))}
        </StyledOptionsContainer>
      )}
    </StyledContainer>
  );
}

export default Filter;
