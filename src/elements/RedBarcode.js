import * as React from 'react';
import Box from '@mui/material/Box';


const RedBarcode = () => {
  return (
    <React.Fragment>
      <Box
        component="img"
        sx={{
          height: 60,
          width: 60,
        }}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAZklEQVRoge3PsQmAQBBE0dGa7L8Ce9JEQcTDCyd4L9tjWe4nAECW57AnR5Js1/s9j96+vPdmbo1u/+1tj/+vs8XthLQR0kZIGyFthLQR0kZIGyFthLQR0kZIGyFthLQR0kYIAFDoBGgQEkBEpHRzAAAAAElFTkSuQmCC"
      />
    </React.Fragment>
  );
};

export default RedBarcode;
