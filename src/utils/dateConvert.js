const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function(date){
    const d = new Date(date);
    var ans = d.getDate()+" "+monthNames[d.getMonth()+1]+", "+d.getFullYear();
    return ans;
}