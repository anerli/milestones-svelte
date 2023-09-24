
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #eeeeee 
		"--color-primary-50": "252 252 252", // #fcfcfc
		"--color-primary-100": "252 252 252", // #fcfcfc
		"--color-primary-200": "251 251 251", // #fbfbfb
		"--color-primary-300": "248 248 248", // #f8f8f8
		"--color-primary-400": "243 243 243", // #f3f3f3
		"--color-primary-500": "238 238 238", // #eeeeee
		"--color-primary-600": "214 214 214", // #d6d6d6
		"--color-primary-700": "179 179 179", // #b3b3b3
		"--color-primary-800": "143 143 143", // #8f8f8f
		"--color-primary-900": "117 117 117", // #757575
		// secondary | #fac252 
		"--color-secondary-50": "254 246 229", // #fef6e5
		"--color-secondary-100": "254 243 220", // #fef3dc
		"--color-secondary-200": "254 240 212", // #fef0d4
		"--color-secondary-300": "253 231 186", // #fde7ba
		"--color-secondary-400": "252 212 134", // #fcd486
		"--color-secondary-500": "250 194 82", // #fac252
		"--color-secondary-600": "225 175 74", // #e1af4a
		"--color-secondary-700": "188 146 62", // #bc923e
		"--color-secondary-800": "150 116 49", // #967431
		"--color-secondary-900": "123 95 40", // #7b5f28
		// tertiary | #f8e45c 
		"--color-tertiary-50": "254 251 231", // #fefbe7
		"--color-tertiary-100": "254 250 222", // #fefade
		"--color-tertiary-200": "253 248 214", // #fdf8d6
		"--color-tertiary-300": "252 244 190", // #fcf4be
		"--color-tertiary-400": "250 236 141", // #faec8d
		"--color-tertiary-500": "248 228 92", // #f8e45c
		"--color-tertiary-600": "223 205 83", // #dfcd53
		"--color-tertiary-700": "186 171 69", // #baab45
		"--color-tertiary-800": "149 137 55", // #958937
		"--color-tertiary-900": "122 112 45", // #7a702d
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #eeeeee 
		"--color-surface-50": "252 252 252", // #fcfcfc
		"--color-surface-100": "252 252 252", // #fcfcfc
		"--color-surface-200": "251 251 251", // #fbfbfb
		"--color-surface-300": "248 248 248", // #f8f8f8
		"--color-surface-400": "243 243 243", // #f3f3f3
		"--color-surface-500": "238 238 238", // #eeeeee
		"--color-surface-600": "214 214 214", // #d6d6d6
		"--color-surface-700": "250 194 82", // #b3b3b3
		"--color-surface-800": "143 143 143", // #8f8f8f
		"--color-surface-900": "117 117 117", // #757575
		
	}
}