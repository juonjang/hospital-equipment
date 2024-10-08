import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// สร้าง StyledTableCell ที่มีการกำหนดสีพื้นหลังและตัวอักษร
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

// สร้าง StyledTableRow ที่มีการสลับสีพื้นหลังของแถว
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function EquipmentList() {
  // สร้าง state สำหรับจัดการข้อมูลและการควบคุม UI
  const [equipment, setEquipment] = useState([]); // เก็บข้อมูลอุปกรณ์ทั้งหมด
  const [order, setOrder] = useState("asc"); // ลำดับการเรียง: 'asc' หรือ 'desc'
  const [orderBy, setOrderBy] = useState("name"); // ฟิลด์ที่ใช้ในการเรียง
  const [page, setPage] = useState(0); // หน้าปัจจุบันใน pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // จำนวนแถวต่อหน้า
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหาสำหรับการกรอง

  // ดึงข้อมูลอุปกรณ์จาก API เมื่อ component ถูก mount
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("/api/equipment/equipment"); // เรียก API เพื่อดึงข้อมูลอุปกรณ์
        setEquipment(response.data); // เก็บข้อมูลอุปกรณ์ใน state
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchEquipment();
  }, []);

  // จัดการการเรียงข้อมูลเมื่อมีการคลิกที่หัวตาราง
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc"); // สลับลำดับการเรียง
    setOrderBy(property); // ตั้งค่าฟิลด์ที่ต้องการเรียง
  };

  // รีเซ็ตหน้าเป็นหน้าแรกเมื่อมีการเปลี่ยนแปลงคำค้นหา
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  // กรองข้อมูลอุปกรณ์ตามคำค้นหา
  const filteredEquipment = equipment.filter((item) =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // เรียงข้อมูลอุปกรณ์ที่ถูกกรองแล้ว
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    // ตรวจสอบว่าฟิลด์มีค่าเพื่อป้องกัน error
    const aValue = a[orderBy] ? a[orderBy].toString().toLowerCase() : "";
    const bValue = b[orderBy] ? b[orderBy].toString().toLowerCase() : "";
    if (bValue < aValue) return order === "asc" ? -1 : 1;
    if (bValue > aValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  // ทำการแบ่งหน้าในข้อมูลที่ถูกกรองและเรียงแล้ว
  const paginatedEquipment = sortedEquipment.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // จัดการการเปลี่ยนหน้าของ pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // จัดการการเปลี่ยนจำนวนแถวต่อหน้าของ pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // อัปเดตจำนวนแถวต่อหน้า
    setPage(0); // รีเซ็ตหน้าเป็นหน้าแรก
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        รายการอุปกรณ์
      </Typography>

      {/* ฟิลด์ค้นหาสำหรับกรองอุปกรณ์ */}
      <TextField
        label="ค้นหาอุปกรณ์"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="equipment table">
          <TableHead>
            <TableRow>
              {/* หัวตารางพร้อมการเรียงลำดับ */}
              <StyledTableCell
                sortDirection={orderBy === "name" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  ชื่ออุปกรณ์
                </TableSortLabel>
              </StyledTableCell>

              {/* เพิ่มการเรียงลำดับให้กับคอลัมน์อื่น ๆ ถ้าต้องการ */}
              <StyledTableCell
                sortDirection={orderBy === "serial_number" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "serial_number"}
                  direction={orderBy === "serial_number" ? order : "asc"}
                  onClick={() => handleRequestSort("serial_number")}
                >
                  หมายเลขซีเรียล
                </TableSortLabel>
              </StyledTableCell>

              {/* คอลัมน์ที่ไม่ต้องการการเรียงลำดับ */}
              <StyledTableCell>สถานะ</StyledTableCell>

              <StyledTableCell
                sortDirection={orderBy === "price" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handleRequestSort("price")}
                >
                  ราคา
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell>สถานที่ตั้ง</StyledTableCell>
              <StyledTableCell>วันที่บำรุงรักษาครั้งล่าสุด</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* แสดงข้อมูลอุปกรณ์ที่ถูกแบ่งหน้า */}
            {paginatedEquipment.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell>{item.name || "ไม่มีข้อมูล"}</TableCell>
                <TableCell>{item.serial_number || "ไม่มีข้อมูล"}</TableCell>
                <TableCell>{item.status || "ไม่มีข้อมูล"}</TableCell>
                <TableCell>
                  {item.price
                    ? Number(item.price).toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                      })
                    : "ไม่มีข้อมูล"}
                </TableCell>
                <TableCell>{item.location || "ไม่มีข้อมูล"}</TableCell>
                <TableCell>
                  {item.last_maintenance_date
                    ? new Date(
                        item.last_maintenance_date
                      ).toLocaleDateString("th-TH")
                    : "ไม่มีข้อมูล"}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* การควบคุมการแบ่งหน้า */}
      <TablePagination
        component="div"
        count={filteredEquipment.length} // ใช้ความยาวของข้อมูลที่ถูกกรองแล้ว
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="จำนวนแถวต่อหน้า:"
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default EquipmentList;
