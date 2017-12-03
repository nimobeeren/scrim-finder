const postReducer = () => ([
	{
		teamName: "Nehox",
		level: "Top",
		maps: ["cache", "overpass", "nuke", "cbble", "mirage", "train"],
		server: true
	},
	{
		teamName: "Team Adrian",
		level: "High",
	},
	{
		teamName: "MouseMafia",
		level: "Medium",
		maps: ["cache", "overpass", "cbble", "mirage"],
		server: false
	}
]);

export default postReducer;
