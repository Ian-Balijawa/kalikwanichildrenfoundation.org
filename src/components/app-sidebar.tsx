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
import { LayoutDashboard, Users, List, UserPlus } from "lucide-react";
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
			label: "Users",
			icon: Users,
			href: "/users",
			subItems: [
				{ label: "All Users", href: "/users/list", icon: List },
				{ label: "Add User", href: "/users/new", icon: UserPlus },
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
