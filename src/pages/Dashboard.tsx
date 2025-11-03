import { useDashboard } from "../context/DashboardContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Interviews from "./Interviews";
import PendingApplications from "./PendingApplications";
import JobOffers from "./JobOffers";
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
    queryKey: ["userData"], // cache key
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2, // retry twice if failed
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

  return (
    <div>
      {selectedItems.includes("Interviews") && <Interviews />}
      {selectedItems.includes("Pending Applications") && (
        <PendingApplications />
      )}
      {selectedItems.includes("Job offers") && <JobOffers />}

      {selectedItems.length === 0 && (
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

            <TableBody>
              {data.map((d, index) => (
                <TableRow key={index}>
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
      )}
    </div>
  );
}

export default LandingDashboard;
