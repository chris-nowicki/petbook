import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function Input({
	label,
	type,
	value,
	name,
	onChangeProp,
	errorProps,
	isDisabled = false,
	placeholder
}) {
	return (
		<div className="mb-3">
			<label className="flex flex-row justify-between text-xl">
				{label}
			</label>
			<div className="relative mt-1 border border-black shadow-sm">
				<input
					type={type}
					name={name}
					className={
						!errorProps
							? "block w-full border-gray-300 py-2 pl-2 text-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
							: "block w-full  border-red-300 pr-10 text-2xl  text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-xl"
					}
					placeholder={placeholder}
					autoComplete=""
					value={value}
					aria-invalid="true"
					onChange={onChangeProp}
					disabled={isDisabled}
				/>
				{errorProps && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{errorProps && (
				<p className="mt-1 text-sm text-red-600" id="email-error">
					{errorProps.message}
				</p>
			)}
		</div>
	);
}

export default Input;