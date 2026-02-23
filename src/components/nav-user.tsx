"use client"
import penguin from "@/assets/penguin.png"
import { useSidebar } from "@/components/ui/sidebar"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CloudUpload, ChevronsUpDown, LogOut } from "lucide-react"
import { handleLogout } from "@/lib/authSignout"

export function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar()

  const onUploadClick = async () => {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: "Documents",
            accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
          },
        ],
        multiple: false,
      })

      const file = await fileHandle.getFile()

      const formData = new FormData()
      formData.append("files", file)

      const res = await fetch("http://localhost:8001/full-RAG/upload_files/", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      console.log("Upload success:", data)
      Swal.fire({
      icon: "success",
      title: "Upload successful!",
      text: `Total chunks: ${data.total_chunks}`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
    } catch (err) {
      console.error(err)
      alert("Upload failed or cancelled")
    }
  }

  const onLogoutClick = async () => {
    await handleLogout()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={penguin} alt={user.name} />
                <AvatarFallback className="rounded-lg">JHT</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={penguin} alt={user.name} />
                  <AvatarFallback className="rounded-lg">cn</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <button onClick={onUploadClick} className="flex items-center gap-2 w-full text-left">
                <CloudUpload />
                Upload Resume
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onLogoutClick}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}