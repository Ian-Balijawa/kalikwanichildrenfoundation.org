import * as React from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function AppHeaderTeamwitcher({
	teams,
}: {
	teams: {
		name: string;
		logo: React.ElementType;
		plan: string;
	}[];
}) {
	const [activeTeam] = React.useState(teams[0]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Link to="" className="grid flex-1 text-left text-sm leading-tight">
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<activeTeam.logo className="size-4" />
								</div>
								<span className="truncate font-semibold">{activeTeam.name}</span>
								<span className="truncate text-xs">{activeTeam.plan}</span>
							</SidebarMenuButton>
						</Link>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
