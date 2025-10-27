const getCategoryColor = (color) => {
    const colors = {
      orange: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/30",
        solid: "bg-orange-500",
      },
      blue: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        solid: "bg-blue-500",
      },
      yellow: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        solid: "bg-yellow-500",
      },
      pink: {
        bg: "bg-pink-500/20",
        text: "text-pink-400",
        border: "border-pink-500/30",
        solid: "bg-pink-500",
      },
      purple: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        solid: "bg-purple-500",
      },
      red: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        solid: "bg-red-500",
      },
      green: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        solid: "bg-green-500",
      },
      indigo: {
        bg: "bg-indigo-500/20",
        text: "text-indigo-400",
        border: "border-indigo-500/30",
        solid: "bg-indigo-500",
      },
      cyan: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        solid: "bg-cyan-500",
      },
      rose: {
        bg: "bg-rose-500/20",
        text: "text-rose-400",
        border: "border-rose-500/30",
        solid: "bg-rose-500",
      },
      amber: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30",
        solid: "bg-amber-500",
      },
      teal: {
        bg: "bg-teal-500/20",
        text: "text-teal-400",
        border: "border-teal-500/30",
        solid: "bg-teal-500",
      },
      violet: {
        bg: "bg-violet-500/20",
        text: "text-violet-400",
        border: "border-violet-500/30",
        solid: "bg-violet-500",
      },
      slate: {
        bg: "bg-slate-500/20",
        text: "text-slate-400",
        border: "border-slate-500/30",
        solid: "bg-slate-500",
      },
    };
    return colors[color] || colors.purple;
  };


  export default getCategoryColor;