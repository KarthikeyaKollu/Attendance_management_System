import React, { useState } from "react";
import Select from "react-select";

type FacultyYear = {
  year: number;
  sections: { value: string; label: string }[];
};

type FacultyBranch = {
  branch: string;
  years: FacultyYear[];
};

const branches: string[] = ["ECE", "CSE", "ME", "CE", "EE"];
const sections: string[] = ["A", "B", "C", "D"];

const Add_FacultyItem: React.FC = () => {
  const [branch, setBranch] = useState<string | null>(null);
  const [yearsData, setYearsData] = useState<FacultyYear[]>([
    { year: 1, sections: [] },
    { year: 2, sections: [] },
    { year: 3, sections: [] },
  ]);
  console.log(yearsData);

  const handleBranchChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setBranch(selectedOption.value);
    } else {
      setBranch(null);
    }
  };

  const handleYearSectionChange = (
    selectedOptions: { value: string; label: string }[] | null,
    yearIndex: number
  ) => {
    const updatedYearsData = [...yearsData];
    updatedYearsData[yearIndex].sections = selectedOptions || [];
    setYearsData(updatedYearsData);
  };

  const handleAddYear = () => {
    const newYear: FacultyYear = { year: yearsData.length + 1, sections: [] };
    setYearsData([...yearsData, newYear]);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.25rem",
      border: "1px solid #ced4da",
      "&:hover": {
        border: "1px solid #ced4da",
      },
    }),
    option: (provided: any) => ({
      ...provided,
      color: "black", // Change the text color of the options
      borderRadius: "0.25rem",
    }),
  };

  const formatOptionLabel = ({ label }: { label: string }) => (
    <div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="container mt-4 [;.=[;;">
      <div className="form-group  ">
        <label>Branch:</label>
        <Select
          options={branches.map((b) => ({ value: b, label: b }))}
          value={branch !== null ? { value: branch, label: branch } : null}
          onChange={handleBranchChange}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          isClearable
          placeholder="Select a branch"
        />
      </div>

      {yearsData.map((year, yearIndex) => (
        <div key={year.year} className="form-group">
          <label>Year {year.year} Sections:</label>
          <Select
            isMulti
            options={sections.map((s) => ({ value: s, label: s }))}
            value={year.sections}
            onChange={(selectedOptions) =>
              handleYearSectionChange(selectedOptions as { value: string; label: string }[], yearIndex)
            }
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            placeholder="Select sections"
          />
        </div>
      ))}

      <button className="btn btn-primary mr-2" onClick={handleAddYear}>
        Add Year
      </button>
      <button className="btn btn-success">Submit</button>
    </div>
  );
};

export default Add_FacultyItem;
