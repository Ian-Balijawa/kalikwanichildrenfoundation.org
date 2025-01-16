import * as React from "react";
import { NavLink } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuButton,
	SidebarMenuSubButton,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	LayoutDashboard,
	Ticket,
	Mail,
	Users,
	Building2,
	FileText,
	PlusCircle,
	List,
	KanbanSquare,
	InboxIcon,
	Send,
	UserPlus,
	Trash,
	Archive,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/nav-user";

export function AppSidebar({ className }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();

	const navItems = [
		{
			label: "Overview",
			icon: LayoutDashboard,
			href: "/",
		},
		{
			label: "Tickets",
			icon: Ticket,
			href: "/tickets",
			subItems: [
				{ label: "All Tickets", href: "/tickets/list", icon: List },
				{ label: "New Ticket", href: "/tickets/new", icon: PlusCircle },
				{ label: "Kanban View", href: "/tickets/board", icon: KanbanSquare },
			],
		},
		{
			label: "Demands",
			icon: FileText,
			href: "/demands",
			subItems: [
				{ label: "All Demands", href: "/demands/list", icon: List },
				{ label: "New Demand", href: "/demands/new", icon: PlusCircle },
				{ label: "Kanban View", href: "/demands/kanban", icon: KanbanSquare },
			],
		},
		{
			label: "Email",
			icon: Mail,
			href: "/emails",
			subItems: [
				{ label: "Inbox", href: "/emails/inbox", icon: InboxIcon },
				{ label: "Add Email", href: "/emails/new", icon: PlusCircle },
				{ label: "Sent", href: "/emails/sent", icon: Send },
				{ label: "Drafts", href: "/emails/drafts", icon: Archive },
				{ label: "Trash", href: "/emails/trash", icon: Trash },
			],
		},
		{
			label: "Users",
			icon: Users,
			href: "/users",
			subItems: [
				{ label: "All Users", href: "/users/list", icon: List },
				{ label: "Add User", href: "/users/new", icon: UserPlus },
			],
		},
		{
			label: "Clients",
			icon: Building2,
			href: "/clients",
			subItems: [
				{ label: "All Clients", href: "/clients/list", icon: List },
				{ label: "Add Client", href: "/clients/new", icon: UserPlus },
			],
		},
	];

	return (
		<Sidebar collapsible="icon" className={cn("border-r", className)}>
			<SidebarHeader></SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
					<SidebarMenu>
						{navItems.map((item) => (
							<SidebarMenuItem key={item.href}>
								<SidebarMenuButton asChild tooltip={item.label}>
									<NavLink
										to={item.href}
										className={({ isActive }) =>
											cn(
												"flex items-center gap-2",
												isActive && "text-primary"
											)
										}
									>
										<item.icon className="h-4 w-4" />
										<span>{item.label}</span>
									</NavLink>
								</SidebarMenuButton>

								{item.subItems && (
									<SidebarMenuSub>
										{item.subItems.map((subItem) => (
											<SidebarMenuSubButton key={subItem.href} asChild>
												<NavLink
													to={subItem.href}
													className={({ isActive }) =>
														cn(
															"flex items-center gap-2",
															isActive && "text-primary"
														)
													}
												>
													<subItem.icon className="h-4 w-4" />
													<span>{subItem.label}</span>
												</NavLink>
											</SidebarMenuSubButton>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
