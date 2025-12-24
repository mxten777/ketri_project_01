import { useState, useLayoutEffect, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { MenuGroup } from "../../constants/menu";
import { isAllowed } from "../../constants/menuFilter";
import { HeaderContext } from "./HeaderContext";

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
	const [rect, setRect] = useState<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (!anchorEl) return setRect(null);
		const update = () => {
			try {
				setRect(anchorEl.getBoundingClientRect());
			} catch {
				setRect(null);
			}
		};
		update();
		window.addEventListener("resize", update);
		window.addEventListener("scroll", update, true);
		const ro = new ResizeObserver(update);
		ro.observe(anchorEl);
		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update, true);
			ro.disconnect();
		};
	}, [anchorEl]);

	const [selected, setSelected] = useState<string | null>(activeGroup ?? null);
	useEffect(() => setSelected(activeGroup ?? null), [activeGroup]);

	const prevPathRef = useRef<string | null>(null);
	useEffect(() => {
		if (prevPathRef.current && prevPathRef.current !== location.pathname) ctx?.setOpenDropdown?.(null);
		prevPathRef.current = location.pathname;
	}, [location.pathname, ctx]);

	const activeMenu = menus.find((m) => m.label === selected) || null;

	if (typeof document === "undefined") return null;
	if (!isOpen) return null;

	const style: React.CSSProperties = rect
		? (() => {
				const menuWidth = Math.min(960, window.innerWidth - 32);
				const offset = 8;
				const left = Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - offset);
				return {
					position: "fixed",
					left: left + "px",
					top: Math.max(0, rect.top + rect.height) + "px",
					width: menuWidth,
					zIndex: 90,
					pointerEvents: "auto",
				} as React.CSSProperties;
			})()
		: { display: "none" };

	const closeMega = () => ctx?.setOpenDropdown?.(null);

	const node = (
		<div onMouseEnter={() => selected && onMouseEnter(selected)} onMouseLeave={() => onMouseLeave && onMouseLeave()}>
			<div style={style}>
				<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-md overflow-visible">
					<div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
						<div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">메뉴</div>
					</div>

					<div className="p-4">
						{activeMenu && activeMenu.layout === "grid" ? (
							<div>
								<div className="flex items-start justify-between mb-4">
									<div>
										<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{activeMenu.label}</div>
										{activeMenu.description && <div className="text-xs text-neutral-500 mt-1">{activeMenu.description}</div>}
									</div>
									{activeMenu.mainPath && isAllowed(activeMenu.mainPath) && (
										<div>
											<Link to={activeMenu.mainPath} className="text-sm font-medium text-primary-800 hover:underline" onClick={closeMega}>
												{activeMenu.label} 전체보기 →
											</Link>
										</div>
									)}
								</div>

								<div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-h-[480px] overflow-y-auto pr-2">
									{activeMenu.items.filter((it) => isAllowed(it.path)).map((item) => {
										const hasHash = item.path.includes("#");
										return (
											<div key={item.path} className="rounded-xl p-3 hover:bg-neutral-50 transition-colors">
												{hasHash ? (
													<a href={item.path} className="block" onClick={closeMega}>
														<div className="text-sm font-medium">{item.label}</div>
														{item.description && <div className="text-xs text-neutral-500 mt-1">{item.description}</div>}
													</a>
												) : (
													<Link to={item.path} className="block" onClick={closeMega}>
														<div className="text-sm font-medium">{item.label}</div>
														{item.description && <div className="text-xs text-neutral-500 mt-1">{item.description}</div>}
													</Link>
												)}
											</div>
										);
									})}
								</div>
							</div>
						) : (
							<div className="grid grid-cols-[220px_1fr] gap-4">
								<div className="pr-2">
									<ul className="space-y-1">
										{menus.map((m) => (
											<li
												key={m.label}
												onMouseEnter={() => {
													setSelected(m.label);
													onMouseEnter(m.label);
												}}
												className={
													"px-3 py-2 rounded-lg cursor-default transition-colors " +
													(selected === m.label ? "bg-primary-50 text-primary-800" : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/5")
												}
											>
												<div className="text-sm font-medium">{m.label}</div>
												{m.description && <div className="text-xs text-neutral-500 mt-1">{m.description}</div>}
											</li>
										))}
									</ul>
								</div>

								<div>
									{(() => {
										const menu = menus.find((mm) => mm.label === selected) || menus[0];
										const filtered = menu.items.filter((item) => isAllowed(item.path));
										const display = filtered.slice(0, 5);

										return (
											<>
												<div className="grid grid-cols-2 gap-3">
													{display.map((item) => {
														const itemActive = location.pathname === item.path || location.pathname.startsWith(item.path.split("#")[0] + "/");
														const hasHash = item.path.includes("#");
														const itemClasses = [
															"relative group block p-3 rounded-lg",
															"transition-colors duration-150",
															itemActive ? "bg-primary-50 text-primary-800" : "bg-white/0 text-neutral-900 hover:bg-neutral-50",
														].join(" ");

														return (
															<div key={item.path} className={itemClasses}>
																<span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
																{hasHash ? (
																	<a href={item.path} className="block" onClick={closeMega}>
																		<div className="text-sm font-medium group-hover:translate-x-[2px] transition-transform">{item.label}</div>
																		{item.description && <div className="text-xs text-neutral-500 mt-1">{item.description}</div>}
																	</a>
																) : (
																	<Link to={item.path} className="block" onClick={closeMega}>
																		<div className="text-sm font-medium group-hover:translate-x-[2px] transition-transform">{item.label}</div>
																		{item.description && <div className="text-xs text-neutral-500 mt-1">{item.description}</div>}
																	</Link>
																)}
															</div>
														);
													})}
												</div>

												{menu.mainPath && isAllowed(menu.mainPath) && (
													<div className="mt-3">
														<Link to={menu.mainPath} className="text-sm font-medium text-primary-800 hover:underline" onClick={closeMega}>
															{menu.label} 전체보기 →
														</Link>
													</div>
												)}
											</>
										);
									})()}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(node, document.body);
}

