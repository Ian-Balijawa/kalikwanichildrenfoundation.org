import { useState, useCallback } from "react";
import { useEmail } from "@/hooks/useEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { extractToEmails, extractCCEmails } from "@/utils/extractEmails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Link as LinkIcon,
	Type,
	Highlighter,
	CheckSquare,
	Table as TableIcon,
	Image as ImageIcon,
	Subscript as SubscriptIcon,
	Superscript as SuperscriptIcon,
	Minus,
	Palette,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FONT_FAMILY_OPTIONS = [
	{ label: "Default", value: "Inter" },
	{ label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
	{ label: "Serif", value: "serif" },
	{ label: "Monospace", value: "monospace" },
	{ label: "Cursive", value: "cursive" },
];

const COLOR_OPTIONS = [
	{ label: "Default", value: "inherit" },
	{ label: "Purple", value: "#9333EA" },
	{ label: "Red", value: "#E11D48" },
	{ label: "Yellow", value: "#FBBF24" },
	{ label: "Blue", value: "#2563EB" },
	{ label: "Green", value: "#16A34A" },
];

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt("Enter image URL");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const addLink = () => {
		const url = window.prompt("Enter URL");
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	const addTable = () => {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
	};

	return (
		<TooltipProvider>
			<div className="border-b bg-muted/50">
				<div className="flex flex-wrap items-center gap-1 p-1">
					{/* Text Formatting Group */}
					<div className="flex items-center bg-background rounded-md p-1 gap-1 shadow-sm">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("bold") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleBold().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<Bold className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<div className="flex items-center gap-2">
									Bold{" "}
									<kbd className="px-2 py-0.5 bg-muted rounded-md text-xs">
										⌘B
									</kbd>
								</div>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("italic") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleItalic().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<Italic className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<div className="flex items-center gap-2">
									Italic{" "}
									<kbd className="px-2 py-0.5 bg-muted rounded-md text-xs">
										⌘I
									</kbd>
								</div>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("underline") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleUnderline().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<UnderlineIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<div className="flex items-center gap-2">
									Underline{" "}
									<kbd className="px-2 py-0.5 bg-muted rounded-md text-xs">
										⌘U
									</kbd>
								</div>
							</TooltipContent>
						</Tooltip>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:bg-muted"
								>
									<Type className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{FONT_FAMILY_OPTIONS.map((font) => (
									<DropdownMenuItem
										key={font.value}
										onClick={() =>
											editor.chain().focus().setFontFamily(font.value).run()
										}
										className={
											editor.isActive("textStyle", { fontFamily: font.value })
												? "bg-muted"
												: ""
										}
									>
										<span style={{ fontFamily: font.value }}>{font.label}</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:bg-muted"
								>
									<Palette className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{COLOR_OPTIONS.map((color) => (
									<DropdownMenuItem
										key={color.value}
										onClick={() =>
											editor.chain().focus().setColor(color.value).run()
										}
										className={
											editor.isActive("textStyle", { color: color.value })
												? "bg-muted"
												: ""
										}
									>
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full border"
												style={{ backgroundColor: color.value }}
											/>
											{color.label}
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("highlight") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleHighlight().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<Highlighter className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Highlight</TooltipContent>
						</Tooltip>
					</div>

					<div className="w-px h-8 bg-border mx-1" />

					{/* List Formatting Group */}
					<div className="flex items-center bg-background rounded-md p-1 gap-1 shadow-sm">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleBulletList().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<List className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Bullet List</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleOrderedList().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<ListOrdered className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Numbered List</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("taskList") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleTaskList().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<CheckSquare className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Task List</TooltipContent>
						</Tooltip>
					</div>

					<div className="w-px h-8 bg-border mx-1" />

					{/* Alignment Group */}
					<div className="flex items-center bg-background rounded-md p-1 gap-1 shadow-sm">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={
										editor.isActive({ textAlign: "left" })
											? "secondary"
											: "ghost"
									}
									size="icon"
									onClick={() =>
										editor.chain().focus().setTextAlign("left").run()
									}
									className="h-8 w-8 hover:bg-muted"
								>
									<AlignLeft className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Align Left</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={
										editor.isActive({ textAlign: "center" })
											? "secondary"
											: "ghost"
									}
									size="icon"
									onClick={() =>
										editor.chain().focus().setTextAlign("center").run()
									}
									className="h-8 w-8 hover:bg-muted"
								>
									<AlignCenter className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Align Center</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={
										editor.isActive({ textAlign: "right" })
											? "secondary"
											: "ghost"
									}
									size="icon"
									onClick={() =>
										editor.chain().focus().setTextAlign("right").run()
									}
									className="h-8 w-8 hover:bg-muted"
								>
									<AlignRight className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Align Right</TooltipContent>
						</Tooltip>
					</div>

					<div className="w-px h-8 bg-border mx-1" />

					{/* Additional Features Group */}
					<div className="flex items-center bg-background rounded-md p-1 gap-1 shadow-sm">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("link") ? "secondary" : "ghost"}
									size="icon"
									onClick={addLink}
									className="h-8 w-8 hover:bg-muted"
								>
									<LinkIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<div className="flex items-center gap-2">
									Add Link{" "}
									<kbd className="px-2 py-0.5 bg-muted rounded-md text-xs">
										⌘K
									</kbd>
								</div>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									onClick={addImage}
									className="h-8 w-8 hover:bg-muted"
								>
									<ImageIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Add Image</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("table") ? "secondary" : "ghost"}
									size="icon"
									onClick={addTable}
									className="h-8 w-8 hover:bg-muted"
								>
									<TableIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Insert Table</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={
										editor.isActive("horizontalRule") ? "secondary" : "ghost"
									}
									size="icon"
									onClick={() => editor.chain().focus().setHorizontalRule().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<Minus className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Horizontal Line</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("subscript") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleSubscript().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<SubscriptIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Subscript</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={editor.isActive("superscript") ? "secondary" : "ghost"}
									size="icon"
									onClick={() => editor.chain().focus().toggleSuperscript().run()}
									className="h-8 w-8 hover:bg-muted"
								>
									<SuperscriptIcon className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Superscript</TooltipContent>
						</Tooltip>
					</div>
				</div>

				{/* Character Count */}
				<div className="px-3 py-1.5 text-xs text-muted-foreground border-t">
					{editor.storage.characterCount.characters()} characters
					{" · "}
					{editor.storage.characterCount.words()} words
				</div>
			</div>
		</TooltipProvider>
	);
};

export default function EmailsNew() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { sendEmail } = useEmail();
	const [isPersonal, setIsPersonal] = useState(false);
	const [attachments, setAttachments] = useState<File[]>([]);
	const [formData, setFormData] = useState({
		to: "",
		cc: "",
		subject: "",
	});

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: false,
				codeBlock: false,
			}),
			Underline,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: "text-primary underline underline-offset-4 hover:text-primary/80",
				},
			}),
			TextAlign.configure({
				types: ["paragraph"],
			}),
			CharacterCount,
			Color,
			TextStyle,
			FontFamily,
			Highlight.configure({
				multicolor: true,
			}),
			Typography,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Placeholder.configure({
				placeholder: "Write your message here...",
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image,
			Subscript,
			Superscript,
			HorizontalRule,
		],
		content: "",
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none min-h-[200px] focus:outline-none px-4 py-2",
			},
		},
	});

	const handleAttachmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setAttachments((prev) => [...prev, ...files]);
	}, []);

	const removeAttachment = useCallback((index: number) => {
		setAttachments((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const toEmails = extractToEmails(formData.to);
		const ccEmails = extractCCEmails(formData.cc);

		if (toEmails.length === 0) {
			toast.error("Please enter at least one recipient");
			return;
		}

		if (!formData.subject) {
			const proceed = window.confirm("Send email without subject?");
			if (!proceed) return;
		}

		try {
			await sendEmail({
				to: toEmails,
				cc: ccEmails,
				subject: formData.subject,
				body: editor?.getHTML() || "",
				attachments,
				is_personal: isPersonal,
			});
			toast.success("Email sent successfully");
			navigate("/emails/sent");
		} catch (error) {
			toast.error("Failed to send email");
		}
	};

	return (
		<div className="h-full flex flex-col">
			<div className="p-4 border-b">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => navigate(-1)}
							className="rounded-full"
						>
							<ArrowLeft className="h-4 w-4" />
						</Button>
						<h1 className="text-2xl font-bold">New Email</h1>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsPersonal(!isPersonal)}
						>
							{isPersonal ? "Personal" : "Work"} Email
						</Button>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-auto p-4">
				<Card>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-4 p-4 border-b">
							<div>
								<Input
									placeholder="To"
									value={formData.to}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, to: e.target.value }))
									}
								/>
							</div>
							<div>
								<Input
									placeholder="Cc"
									value={formData.cc}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, cc: e.target.value }))
									}
								/>
							</div>
							<div>
								<Input
									placeholder="Subject"
									value={formData.subject}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											subject: e.target.value,
										}))
									}
								/>
							</div>
						</div>

						<div className="border-b">
							<MenuBar editor={editor} />
							<div className="relative">
								<EditorContent editor={editor} className="min-h-[300px]" />
							</div>
						</div>

						{/* Attachments */}
						<div className="p-4">
							{attachments.length > 0 && (
								<div className="space-y-2 mb-4">
									<div className="text-sm font-medium">Attachments</div>
									<div className="flex flex-wrap gap-2">
										{attachments.map((file, index) => (
											<div
												key={index}
												className="flex items-center gap-2 bg-muted rounded-full pl-3 pr-2 py-1"
											>
												<span className="text-sm truncate max-w-[200px]">
													{file.name}
												</span>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="h-5 w-5 rounded-full"
													onClick={() => removeAttachment(index)}
												>
													<X className="h-3 w-3" />
												</Button>
											</div>
										))}
									</div>
								</div>
							)}

							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<Input
										type="file"
										multiple
										className="hidden"
										id="file-upload"
										onChange={handleAttachmentChange}
									/>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() =>
											document.getElementById("file-upload")?.click()
										}
									>
										<Paperclip className="h-4 w-4 mr-2" />
										Attach Files
									</Button>
								</div>
								<Button type="submit">
									<Send className="h-4 w-4 mr-2" />
									Send
								</Button>
							</div>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
