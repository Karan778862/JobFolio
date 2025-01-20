import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CompaniesTable = () => {
  const { companies, searchComapnyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFiltercompany] = useState(companies);
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchComapnyByText) {
          return true;
        };
        return company?.name
          ?.toLowerCase()
          .includes(searchComapnyByText.toLowerCase());
      });
    setFiltercompany(filteredCompany);
  },[companies, searchComapnyByText]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registerd comapnies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         
              {filterCompany.map((company) => (
                <tr key={company.id}>
                  <TableCell>
                    <Avatar className=" rounded-full" size="icon">
                      <AvatarImage
                        src={company.logo}
                        size="icon"
                        className="h-10 w-10"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className=" flex  items-center gap-2 w-fit cursor-pointer">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            
          
        </TableBody>
      </Table>
    </div>
  );
};
