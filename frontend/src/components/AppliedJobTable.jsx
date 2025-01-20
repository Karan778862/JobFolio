import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "../components/ui/badge";
import { useSelector } from "react-redux";

export const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of uour appliied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You havent applied any jobs yet</span>
          ) : (
            allAppliedJobs.map((appliedjob, index) => (
              <TableRow key={index}>
                <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedjob?.status == "rejected"
                        ? "bg-red-500"
                        : appliedjob?.status == "panding"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedjob?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
