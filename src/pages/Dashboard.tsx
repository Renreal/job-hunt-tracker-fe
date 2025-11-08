import { useDashboard } from "../context/DashboardContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/getUserData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ButtonGroupView } from "./ButtonGroupView";

interface UserData {
  id: string;
  company: string;
  location: string;
  platform: string;
  position: string;
  status: string;
  date: string;
}

function LandingDashboard() {
  const { selectedItems } = useDashboard();

  const { data, isLoading, isError, error } = useQuery<UserData[]>({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading)
    return (
      <DotLottieReact
        src="/loading.lottie"
        loop
        autoplay
        className="w-300 h-250"
      />
    );
  if (isError)
    return <p style={{ color: "red" }}>{(error as Error).message}</p>;
  if (!data || !data.length) return <p>No user data found.</p>;

  // 🧠 Filter logic
  const filteredData =
    selectedItems.length > 0
      ? data.filter((item) =>
          selectedItems.some(
            (selected) =>
              item.status.toLowerCase() === selected.toLowerCase()
          )
        )
      : data;

  return (
    <div style={{borderTop: "0.1px solid #80808033"}}>
      <Table>
        <TableCaption>
          {selectedItems.length > 0
            ? `Showing ${selectedItems.join(", ")}`
            : "List of your applications."}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.company}</TableCell>
              <TableCell>{d.location}</TableCell>
              <TableCell>{d.platform}</TableCell>
              <TableCell>{d.position}</TableCell>
              <TableCell>{d.status}</TableCell>
              <TableCell className="text-right font-bold">
                <ButtonGroupView user={d} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LandingDashboard;
