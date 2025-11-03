import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

function Interviews() {
  return (
    <div>
      <Table>
        <TableCaption>List of your applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

      </Table>
    </div>
  );
}

export default Interviews;
