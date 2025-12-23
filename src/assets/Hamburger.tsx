import type { ComponentProps } from "react";

const Hamburger = ({ ...props }: ComponentProps<"svg">) => {
	return (
		<svg viewBox="0 0 12 12" aria-hidden="true" {...props}>
			<g fill="none">
				<rect height="12" width="12" fill="none" />
				<line
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.5"
					x1="0.797"
					x2="11.199"
					y1="1.732"
					y2="1.732"
				/>
				<line
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.5"
					x1="0.797"
					x2="11.199"
					y1="5.982"
					y2="5.982"
				/>
				<line
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.5"
					x1="0.797"
					x2="11.199"
					y1="10.23"
					y2="10.23"
				/>
			</g>
		</svg>
	);
};

export default Hamburger;
