import { useDashboard } from "../context/DashboardContext";
import Interviews from "./Interviews";
import PendingApplications from "./PendingApplications";
import JobOffers from "./JobOffers";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

function LandingDashboard() {
  const { selectedItems } = useDashboard();

  return (
    <div>
      {selectedItems.includes("Interviews") && <Interviews />}
      {selectedItems.includes("Pending Applications") && (
        <PendingApplications />
      )}
      {selectedItems.includes("Job offers") && <JobOffers />}

      {selectedItems.length === 0 && (
        // <p className="text-muted-foreground">
        //   Select a calendar item to view details.
        // </p>
        <div>
          {/* <Interviews/>
         <PendingApplications/>
        <JobOffers/>  */}
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow><TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default LandingDashboard;
