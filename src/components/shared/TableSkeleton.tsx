import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                variant="rectangular"
                height={20}
                animation="wave"
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};


export default TableSkeleton;