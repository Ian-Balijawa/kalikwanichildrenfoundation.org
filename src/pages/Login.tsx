import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { FaGoogle, FaLock, FaSpinner } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await login.mutateAsync(credentials);
			toast.success("Welcome back!");
			navigate("");
		} catch (error: unknown) {
			toast.error("Error logging in", {
				// @ts-ignore
				description: error.response?.data.error.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			toast.success("Welcome back!");
			navigate("");
		} catch (error: unknown) {
			toast.error("Error signing in with Google", {
				// @ts-ignore
				description: error.response?.data.error.message,
			});
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
			{/* Logo Section */}
			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col gap-6"
				>
					<div className="text-center mb-4">
						<Link to="/" className="inline-block group">
							<div className="flex justify-center mb-4">
								<div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<FaLock className="h-6 w-6 text-white" />
								</div>
							</div>
							<h1 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90">
								BASE APP
							</h1>
						</Link>
					</div>

					<Card className="backdrop-blur-sm bg-white/10 border-white/20">
						<CardHeader className="space-y-1 text-white">
							<CardTitle className="text-2xl text-center">Welcome back</CardTitle>
							<CardDescription className="text-center text-white/60">
								Sign in to access your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="grid gap-6">
								<div className="flex flex-col gap-4">
									<Button
										type="button"
										variant="outline"
										className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
										onClick={handleGoogleLogin}
									>
										<FaGoogle className="mr-2 h-4 w-4" />
										Sign in with Google
									</Button>
								</div>

								<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
									<span className="relative z-10 bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>

								<div className="grid gap-4">
									<div className="grid gap-2">
										<Label htmlFor="email" className="text-white/80">
											Email
										</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
											<Input
												id="email"
												type="email"
												value={credentials.email}
												onChange={(e) =>
													setCredentials((prev) => ({
														...prev,
														email: e.target.value,
													}))
												}
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your email"
												required
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="password" className="text-white/80">
												Password
											</Label>
											<Link
												to="/forgot-password"
												className="text-sm text-white/60 hover:text-white"
											>
												Forgot password?
											</Link>
										</div>
										<div className="relative">
											<FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
											<Input
												id="password"
												type="password"
												value={credentials.password}
												onChange={(e) =>
													setCredentials((prev) => ({
														...prev,
														password: e.target.value,
													}))
												}
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your password"
												required
											/>
										</div>
									</div>

									<Button
										type="submit"
										className="w-full bg-white text-primary-900 hover:bg-white/90 transition-colors"
										disabled={isLoading}
									>
										{isLoading ? (
											<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Sign In"
										)}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					<div className="text-center text-white/40 text-xs">
						By signing in, you agree to our{" "}
						<Link
							to="/terms"
							className="underline underline-offset-4 hover:text-white/60"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							to="/privacy"
							className="underline underline-offset-4 hover:text-white/60"
						>
							Privacy Policy
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
