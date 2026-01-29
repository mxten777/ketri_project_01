import { useState, useLayoutEffect, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { MenuGroup } from "../../constants/menu";
import { isAllowed } from "../../constants/menuFilter";
import { HeaderContext } from "./HeaderContext";
import { navigateWithHash } from "../../utils/scrollToHash";

const ABOUT_KEY = "about";
const ABOUT_ALL_VIEW = "/about";

interface Props {
	menus: MenuGroup[];
	activeGroup?: string | null;
	location: { pathname: string };
	onMouseEnter: (label: string) => void;
	onMouseLeave?: () => void;
	anchorEl?: HTMLElement | null;
	isOpen: boolean;
}

export default function HeaderMegaMenu({
	menus,
	isOpen,
	activeGroup,
	location,
	onMouseEnter,
	onMouseLeave,
	anchorEl,
}: Props) {
	const ctx = useContext(HeaderContext);
	const navigate = useNavigate();
	const [rect, setRect] = useState<DOMRect | null>(null);
	const [selected, setSelected] = useState<string | null>(activeGroup ?? null);
	const lastValidAnchorRef = useRef<HTMLElement | null>(null);

	useEffect(() => setSelected(activeGroup ?? null), [activeGroup]);

	// Keep last valid anchorEl to prevent flickering
	useEffect(() => {
		if (anchorEl) {
			lastValidAnchorRef.current = anchorEl;
		}
	}, [anchorEl]);

	useLayoutEffect(() => {
		// Use current anchorEl or fallback to last valid one
		const effectiveAnchor = anchorEl || lastValidAnchorRef.current;
		
		if (!effectiveAnchor || !isOpen) {
			console.log('[HeaderMegaMenu] No anchor or not open, hiding menu');
			return setRect(null);
		}
		
		console.log('[HeaderMegaMenu] Setting up position for:', activeGroup, effectiveAnchor);
		const update = () => {
			try {
				const newRect = effectiveAnchor.getBoundingClientRect();
				console.log('[HeaderMegaMenu] Rect updated:', newRect);
				setRect(newRect);
			} catch (err) {
				console.error('[HeaderMegaMenu] Error getting rect:', err);
				setRect(null);
			}
		};
		update();
		window.addEventListener("resize", update);
		window.addEventListener("scroll", update, true);
		const ro = new ResizeObserver(update);
		ro.observe(effectiveAnchor);
		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update, true);
			ro.disconnect();
		};
	}, [anchorEl, activeGroup, isOpen]);

	const prevPathRef = useRef<string | null>(null);
	useEffect(() => {
		if (prevPathRef.current && prevPathRef.current !== location.pathname) {

			ctx?.setOpenDropdown?.(null);
		}
		prevPathRef.current = location.pathname;
	}, [location.pathname, ctx]);

	if (typeof document === "undefined") return null;
	if (!isOpen) return null;

	const style: React.CSSProperties = rect
		? (() => {
			const menuWidthNum = Math.min(960, window.innerWidth - 32);
			const offset = 8;
			// Align menu left edge with anchor element for better cursor tracking
			const leftNum = Math.min(Math.max(8, rect.left - 16), window.innerWidth - menuWidthNum - offset);
			const topNum = Math.max(0, rect.top + rect.height);
			return {
				position: "fixed",
				left: leftNum + "px",
				top: topNum + "px",
				width: menuWidthNum,
				zIndex: 90,
				pointerEvents: "auto",
			} as React.CSSProperties;
		})()
		: { display: "none" };

	// Inline bridge style for an absolute element inside the fixed menu container
	// Larger bridge for better hover stability
	const bridgeInlineStyle: React.CSSProperties = {
		position: "absolute",
		top: "-80px",
		left: "-32px",
		right: "-32px",
		height: "80px",
		zIndex: 91,
		background: "transparent",
		pointerEvents: "none",
	};

	const closeMega = () => ctx?.setOpenDropdown?.(null);

	function handleNav(e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, targetHref: string) {
		e.preventDefault();
		e.stopPropagation();

		// Use unified navigation utility that handles hash scrolling correctly
		navigateWithHash(navigate, targetHref, closeMega);
	}

	function computeDisplay(menuGroup: MenuGroup) {
		const filtered = menuGroup.items.filter((it) => isAllowed(it.path));
		// Show all items without truncation
		const isTruncated = false;
		const display = filtered;
		return { filtered, isTruncated, display } as const;
	}

	const node = (
		<div
			id="mega-menu-panel"
			data-mega-hoverzone="true"
			onMouseEnter={() => selected && onMouseEnter(selected)}
			onMouseLeave={() => onMouseLeave && onMouseLeave()}
			onKeyDown={(e) => {
				// Esc should close the mega menu and restore focus to the trigger anchor
								if (e.key === "Escape" || e.key === "Esc") {
					e.stopPropagation();
					closeMega();
					try {
						anchorEl?.focus();
									} catch (err) {
										void err;
									}
				}
			}}
		>
			<div style={style}>
				{/* transparent bridge to maintain hover when moving cursor from header to panel */}
				<div style={bridgeInlineStyle} />
				<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl overflow-visible">
					<div className="p-5">
						{(() => {
							const activeMenu = menus.find((m) => m.label === selected) || null;
							if (!activeMenu) return null;

							if (activeMenu.layout === "grid") {
								const { isTruncated, display } = computeDisplay(activeMenu);

								return (
									<div>
										<div className="mb-3">
											<div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{activeMenu.label}</div>
										</div>

										<div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto pr-2">
											{display.map((item) => {
											return (
												<a
													key={item.path}
													href={item.path}
													onClick={(e) => handleNav(e, item.path)}
													onKeyDown={(e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															handleNav(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.path);
														}
													}}
													className="group flex items-center justify-center min-h-[56px] px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 text-neutral-900 dark:text-neutral-200 hover:text-primary-700 dark:hover:text-primary-400"
												>
													<div className="text-sm font-medium text-center">{item.label}</div>
												</a>
											);
											})}
										</div>
									</div>
								);
							}

							// default: two-column layout
							const menu = menus.find((mm) => mm.label === selected) || menus[0];
							// Special-case: ABOUT_KEY -> show all items
							let display = [] as typeof menu.items;
							let isTruncated = false;
							if (menu.key === ABOUT_KEY) {
								display = menu.items.filter((it) => isAllowed(it.path));
								isTruncated = false;
							} else {
								const _ = computeDisplay(menu);
								isTruncated = _.isTruncated;
								display = _.display;
							}

							return (
<div className="grid grid-cols-[180px_1fr] gap-6">
								<div className="pr-2">
									<ul className="space-y-0.5">
										{menus.map((m) => (
												<li
													key={m.label}
													onMouseEnter={() => {
														setSelected(m.label);
														onMouseEnter(m.label);
													}}
													onClick={() => {
														setSelected(m.label);
														onMouseEnter(m.label);
													}}
													tabIndex={0}
													onKeyDown={(e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															setSelected(m.label);
															onMouseEnter(m.label);
														}
													}}
													className={
														"px-2.5 py-1.5 rounded-md cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 " +
														(selected === m.label 
															? "bg-primary-600/5 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400" 
															: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200")
													}
												>
													{m.key === ABOUT_KEY ? (
														<Link
															to={ABOUT_ALL_VIEW}
															className="text-[13px] font-medium"
															aria-label="연구소 소개 목록 보기"
															onClick={() => {
																if (typeof queueMicrotask === "function") queueMicrotask(() => closeMega());
																else setTimeout(() => closeMega(), 0);
															}}
														>
															{m.label}
														</Link>
													) : (
														<div className="text-[13px] font-medium">{m.label}</div>
													)}
													</li>
												))}
										</ul>
									</div>

									<div>
										<div className="grid grid-cols-2 gap-2.5">
											{display.map((item) => {
												const itemActive = location.pathname === item.path || location.pathname.startsWith(item.path.split("#")[0] + "/");

												return (
													<a
														key={item.path}
														href={item.path}
														onClick={(e) => handleNav(e, item.path)}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																handleNav(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.path);
															}
														}}
														className={
															[
																"group flex items-center min-h-[52px] px-4 py-3 rounded-xl",
																"transition-all duration-200",
																"border border-transparent",
																itemActive 
																	? "bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-300 border-primary-200 dark:border-primary-800" 
																	: "text-neutral-800 dark:text-neutral-200 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 hover:border-primary-100 dark:hover:border-primary-900/30",
															].join(" ")
														}
													>
														<div className="font-medium group-hover:translate-x-0.5 transition-transform">{item.label}</div>
													</a>
												);
											})}
										</div>
									</div>
								</div>
							);
						})()}
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(node, document.body);
}

