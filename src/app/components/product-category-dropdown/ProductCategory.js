import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ProductCategories } from "app/constants/ProductCategories";

const ProductCategory = (props) => {
  const { classname, value, name, onChange, datatestid } = props;

  const handleCategoryChange = (event) => {
    const newValue = event.target.value;
    onChange({
      target: {
        name: name,
        value: newValue,
      },
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Product Category</InputLabel>
        <Select
          label="Product Category"
          className={classname}
          value={value}
          data-testid={datatestid}
          onChange={handleCategoryChange}
        >
          {ProductCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductCategory;
