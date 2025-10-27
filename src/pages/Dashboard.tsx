import { useDashboard } from "../context/DashboardContext";
import Interviews from "./Interviews";
import PendingApplications from "./PendingApplications";
import JobOffers from "./JobOffers";
import { getUserData } from "../api/getUserData";
import { useEffect, useState } from "react";
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
  company: string;
  location: string;
  platform: string;
  position: string;
  status: string;
  date: string;
}

function LandingDashboard() {
  const { selectedItems } = useDashboard();

  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserData();
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data.length) return <p>No user data found.</p>;

  return (
    <div>
      {selectedItems.includes("Interviews") && <Interviews />}
      {selectedItems.includes("Pending Applications") && <PendingApplications />}
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
