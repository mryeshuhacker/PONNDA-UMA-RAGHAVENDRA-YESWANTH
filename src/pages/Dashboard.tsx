import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  UserCircle2,
  Lock,
  ChevronRight,
  RefreshCw,
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Edit2,
  X as CloseIcon
} from "lucide-react";
import { collection, query, orderBy, onSnapshot, limit, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { cn } from "@/src/lib/utils";

const ADMIN_EMAIL = "luminidigital77@gmail.com";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "hiring" | "messages">("overview");

  const [orders, setOrders] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "createdAt",
    direction: "desc",
  });

  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [editingReferral, setEditingReferral] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [refStatus, setRefStatus] = useState("");
  const [trackingInfo, setTrackingInfo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const qApps = query(collection(db, "hiringApplications"), orderBy("createdAt", "desc"), limit(50));
      const qMsgs = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50));
      const qRefs = query(collection(db, "referrals"), orderBy("createdAt", "desc"), limit(50));

      const unsubOrders = onSnapshot(qOrders, (s) => setOrders(s.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubApps = onSnapshot(qApps, (s) => setApplications(s.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubMsgs = onSnapshot(qMsgs, (s) => setMessages(s.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubRefs = onSnapshot(qRefs, (s) => setReferrals(s.docs.map(d => ({ id: d.id, ...d.data() }))));

      return () => { unsubOrders(); unsubApps(); unsubMsgs(); unsubRefs(); };
    }
  }, [user]);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><RefreshCw className="animate-spin" /></div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <section className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center bg-luxury-black">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="text-lumina-yellow" size={32} />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Admin Portal</h1>
            <p className="text-white/40 mb-8">Access restricted to authorized personnel of Lumina Digital.</p>
            <button onClick={login} className="btn-primary w-full flex items-center justify-center">
              <UserCircle2 className="mr-2" />
              Sign In with Google
            </button>
            {user && user.email !== ADMIN_EMAIL && (
              <p className="text-red-500 mt-4 text-sm font-medium">Access Denied: {user.email}</p>
            )}
        </div>
      </section>
    );
  }

  const stats = {
    totalRevenue: orders.reduce((acc, curr) => acc + (curr.amount || 0), 0),
    totalOrders: orders.length,
    totalApps: applications.length,
    totalMsgs: messages.length,
    totalRefs: referrals.length
  };

  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const monthName = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    const monthKey = `${monthName} ${year}`;
    
    const monthlyRevenue = orders
      .filter(o => {
        const orderDate = o.createdAt?.toDate?.() || new Date(o.createdAt);
        return orderDate.getMonth() === d.getMonth() && orderDate.getFullYear() === d.getFullYear();
      })
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
      
    return { name: monthKey, revenue: monthlyRevenue };
  });

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    if ((newStatus === 'shipped' || newStatus === 'delivered') && !trackingInfo) {
      alert(`Please provide tracking information for ${newStatus} status.`);
      return;
    }

    setIsUpdating(true);
    try {
      await updateDoc(doc(db, "orders", editingOrder.id), {
        status: newStatus,
        trackingInfo: trackingInfo,
        updatedAt: serverTimestamp()
      });
      setEditingOrder(null);
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateReferralStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReferral) return;
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, "referrals", editingReferral.id), {
        status: refStatus,
        updatedAt: serverTimestamp()
      });

      // Notify partner via API
      await fetch("/api/notify-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerEmail: editingReferral.referrerEmail,
          partnerName: editingReferral.referrerName,
          clientName: editingReferral.clientName,
          status: refStatus,
          commissionEarned: refStatus === "completed" ? 2500 : 0 
        })
      });

      setEditingReferral(null);
    } catch (err) {
      console.error("Failed to update referral status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedOrders = orders
    .filter((order) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        order.fullName?.toLowerCase().includes(searchStr) ||
        order.email?.toLowerCase().includes(searchStr) ||
        order.productName?.toLowerCase().includes(searchStr) ||
        order.status?.toLowerCase().includes(searchStr)
      );
    })
    .sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      // Handle Firestore timestamps
      if (valA?.toDate) valA = valA.toDate();
      if (valB?.toDate) valB = valB.toDate();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <section className="pt-24 pb-20 bg-[#080808] min-h-screen">
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            {[
              { id: "overview", icon: BarChart3, label: "Overview" },
              { id: "orders", icon: ShoppingBag, label: "Orders" },
              { id: "hiring", icon: Briefcase, label: "Hiring" },
              { id: "referrals", icon: DollarSign, label: "Partner Leads" },
              { id: "messages", icon: MessageSquare, label: "Messages" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium",
                  activeTab === tab.id ? "bg-lumina-yellow text-black" : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-xl">
               <img src={user.photoURL || ""} className="w-8 h-8 rounded-full" />
               <div className="truncate">
                  <div className="text-sm font-bold truncate">{user.displayName}</div>
                  <div className="text-[10px] text-white/40 truncate">Admin</div>
               </div>
             </div>
             <button onClick={logout} className="w-full flex items-center justify-center space-x-2 text-white/40 hover:text-red-500 transition-colors py-2">
                <LogOut size={18} />
                <span className="text-sm">Log Out</span>
             </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex items-end justify-between">
                   <div>
                      <h2 className="text-4xl font-display font-bold">Good morning, Yeswanth.</h2>
                      <p className="text-white/40 mt-1">Here &apos;s what &apos;s happening with Lumina Digital today.</p>
                   </div>
                   <div className="px-4 py-2 bg-lumina-yellow rounded-lg text-black font-bold text-sm">
                      Live Updates Active
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "Total Revenue", val: `₹${stats.totalRevenue.toLocaleString()}`, icon: RefreshCw },
                    { label: "Sales count", val: stats.totalOrders, icon: ShoppingBag },
                    { label: "Applicants", val: stats.totalApps, icon: Users },
                    { label: "Referrals", val: stats.totalRefs, icon: DollarSign }
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5">
                       <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">{s.label}</div>
                       <div className="text-3xl font-display font-bold text-lumina-yellow">{s.val}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 h-[400px]">
                  <h4 className="font-bold mb-6">Revenue Overview (Last 6 Months)</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#ffffff40" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#ffffff40" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ 
                          backgroundColor: '#050505', 
                          border: '1px solid #ffffff10',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                        itemStyle={{ color: '#FFD700' }}
                      />
                      <Bar 
                        dataKey="revenue" 
                        fill="#FFD700" 
                        radius={[6, 6, 0, 0]} 
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                      <h4 className="font-bold mb-6 flex items-center justify-between">
                         Recent Referrals
                         <ChevronRight size={18} className="text-white/20" />
                      </h4>
                      <div className="space-y-4">
                        {referrals.slice(0, 5).map(r => (
                          <div key={r.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                             <div>
                                <div className="text-sm font-bold">{r.clientName}</div>
                                <div className="text-xs text-white/40">From: {r.referrerName}</div>
                             </div>
                             <span className="text-[10px] uppercase font-bold text-lumina-yellow px-2 py-1 bg-lumina-yellow/10 rounded-md">
                                {r.status}
                             </span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                      <h4 className="font-bold mb-6 flex items-center justify-between">
                         Recent Messages
                         <ChevronRight size={18} className="text-white/20" />
                      </h4>
                      <div className="space-y-4">
                        {messages.slice(0, 5).map(m => (
                          <div key={m.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                             <div>
                                <div className="text-sm font-bold">{m.name}</div>
                                <div className="text-xs text-white/40 line-clamp-1">{m.message}</div>
                             </div>
                             <MessageSquare className="text-white/20" size={16} />
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div key="orders" className="space-y-8">
                <div className="flex justify-between items-center">
                   <h2 className="text-4xl font-display font-bold">Sales Ledger</h2>
                   <div className="flex bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-lumina-yellow/50 transition-colors">
                      <Search size={18} className="text-white/20 mr-2" />
                      <input 
                        className="bg-transparent border-none text-sm outline-none w-64" 
                        placeholder="Search orders..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                </div>
                <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort("fullName")}>
                               <div className="flex items-center space-x-2">
                                  <span>Customer</span>
                                  <SortIcon active={sortConfig.key === "fullName"} direction={sortConfig.direction} />
                               </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort("productName")}>
                               <div className="flex items-center space-x-2">
                                  <span>Product</span>
                                  <SortIcon active={sortConfig.key === "productName"} direction={sortConfig.direction} />
                               </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort("amount")}>
                               <div className="flex items-center space-x-2">
                                  <span>Amount</span>
                                  <SortIcon active={sortConfig.key === "amount"} direction={sortConfig.direction} />
                               </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort("status")}>
                               <div className="flex items-center space-x-2">
                                  <span>Status</span>
                                  <SortIcon active={sortConfig.key === "status"} direction={sortConfig.direction} />
                               </div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors group" onClick={() => requestSort("createdAt")}>
                               <div className="flex items-center space-x-2">
                                  <span>Date</span>
                                  <SortIcon active={sortConfig.key === "createdAt"} direction={sortConfig.direction} />
                               </div>
                            </th>
                            <th className="px-6 py-4">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAndSortedOrders.map(o => (
                          <tr key={o.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                               <div className="text-sm font-bold">{o.fullName}</div>
                               <div className="text-xs text-white/40">{o.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">{o.productName}</td>
                            <td className="px-6 py-4 text-sm font-bold text-lumina-yellow">₹{o.amount}</td>
                            <td className="px-6 py-4">
                               <div className="space-y-1">
                                 <span className={cn(
                                   "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                   o.status === 'delivered' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                   o.status === 'shipped' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                   "bg-lumina-yellow/10 text-lumina-yellow border-lumina-yellow/20"
                                 )}>
                                    {o.status}
                                 </span>
                                 {o.trackingInfo && <div className="text-[9px] text-white/30 truncate max-w-[100px]">ID: {o.trackingInfo}</div>}
                               </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-white/40">
                               {o.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                               <button 
                                 onClick={() => {
                                   setEditingOrder(o);
                                   setNewStatus(o.status);
                                   setTrackingInfo(o.trackingInfo || "");
                                 }}
                                 className="p-2 text-white/20 hover:text-lumina-yellow transition-colors"
                               >
                                 <Edit2 size={16} />
                               </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {editingOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setEditingOrder(null)}
                  />
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg glass p-10 rounded-[2.5rem] shadow-2xl"
                  >
                    <button 
                      onClick={() => setEditingOrder(null)}
                      className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                    >
                      <CloseIcon size={24} />
                    </button>

                    <h3 className="text-3xl font-display font-bold mb-2">Update Order</h3>
                    <p className="text-white/40 mb-8 border-b border-white/5 pb-4">
                       Editing order for <span className="text-white font-medium">{editingOrder.fullName}</span>
                    </p>

                    <form onSubmit={handleUpdateStatus} className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">Order Status</label>
                         <select 
                           value={newStatus}
                           onChange={(e) => {
                             setNewStatus(e.target.value);
                           }}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors appearance-none text-white"
                         >
                            <option value="pending" className="bg-luxury-black">Pending</option>
                            <option value="paid" className="bg-luxury-black">Paid</option>
                            <option value="shipped" className="bg-luxury-black">Shipped</option>
                            <option value="delivered" className="bg-luxury-black">Delivered</option>
                            <option value="failed" className="bg-luxury-black">Failed</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between items-center px-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Tracking Information</label>
                           {(newStatus === 'shipped' || newStatus === 'delivered') && !trackingInfo && (
                             <span className="text-[9px] text-lumina-yellow font-bold animate-pulse">Required for {newStatus}</span>
                           )}
                         </div>
                         <input 
                           type="text"
                           value={trackingInfo}
                           onChange={(e) => setTrackingInfo(e.target.value)}
                           placeholder={newStatus === 'delivered' ? "Required: Enter delivery confirmation/ID" : "Enter tracking ID or delivery note..."}
                           className={cn(
                             "w-full bg-white/5 border rounded-2xl px-6 py-4 focus:outline-none transition-all",
                             (newStatus === 'shipped' || newStatus === 'delivered') && !trackingInfo 
                               ? "border-lumina-yellow/50 ring-1 ring-lumina-yellow/20" 
                               : "border-white/10 focus:border-lumina-yellow"
                           )}
                         />
                      </div>

                      <div className="pt-4 flex space-x-4">
                         <button 
                           type="button" 
                           onClick={() => setEditingOrder(null)}
                           className="flex-1 px-8 py-4 rounded-full border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                         >
                            Cancel
                         </button>
                         <button 
                           type="submit" 
                           disabled={isUpdating}
                           className="flex-1 btn-primary disabled:opacity-50"
                         >
                            {isUpdating ? "Updating..." : "Save Changes"}
                         </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {editingReferral && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setEditingReferral(null)}
                  />
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg glass p-10 rounded-[2.5rem] shadow-2xl"
                  >
                    <button 
                      onClick={() => setEditingReferral(null)}
                      className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                    >
                      <CloseIcon size={24} />
                    </button>

                    <h3 className="text-3xl font-display font-bold mb-2">Referral Status</h3>
                    <p className="text-white/40 mb-8 border-b border-white/5 pb-4">
                       Updating lead for <span className="text-white font-medium">{editingReferral.clientName}</span>
                    </p>

                    <form onSubmit={handleUpdateReferralStatus} className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-2">Project Progress</label>
                         <select 
                           value={refStatus}
                           onChange={(e) => setRefStatus(e.target.value)}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-lumina-yellow transition-colors appearance-none text-white"
                         >
                            <option value="pending">Pending Verification</option>
                            <option value="verified">Verified Lead</option>
                            <option value="started">Project Started</option>
                            <option value="completed">Project Completed</option>
                            <option value="paid">Commission Paid</option>
                         </select>
                      </div>

                      <p className="text-[10px] text-white/30 italic px-2">
                        * A notification email will be automatically sent to {editingReferral.referrerName} upon saving.
                      </p>

                      <div className="pt-4 flex space-x-4">
                         <button 
                           type="button" 
                           onClick={() => setEditingReferral(null)}
                           className="flex-1 px-8 py-4 rounded-full border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                         >
                            Cancel
                         </button>
                         <button 
                           type="submit" 
                           disabled={isUpdating}
                           className="flex-1 btn-primary disabled:opacity-50"
                         >
                            {isUpdating ? "Processing..." : "Notify Partner"}
                         </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {activeTab === "hiring" && (
              <div key="hiring" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map(a => (
                   <div key={a.id} className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="text-xl font-bold">{a.name}</h4>
                            <p className="text-lumina-yellow text-sm font-medium">{a.role}</p>
                         </div>
                         <div className="text-[10px] text-white/40 uppercase tracking-widest">{a.createdAt?.toDate?.()?.toLocaleDateString()}</div>
                      </div>
                      <div className="text-sm text-white/60 line-clamp-3">“{a.skills}”</div>
                      <div className="pt-4 flex border-t border-white/5 space-x-4">
                         <a href={a.portfolioLink} target="_blank" className="btn-primary py-2 px-4 text-xs flex-1 text-center">Review Portfolio</a>
                         <a href={`mailto:${a.email}`} className="bg-white/10 py-2 px-4 rounded-full text-xs flex-1 text-center border border-white/10">Email Candidate</a>
                      </div>
                   </div>
                ))}
              </div>
            )}

            {activeTab === "referrals" && (
              <div key="referrals" className="space-y-6">
                 {referrals.map(r => (
                    <div key={r.id} className="bg-white/5 p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between gap-6">
                       <div className="space-y-2">
                          <div className="text-2xl font-bold">{r.clientName}</div>
                          <div className="text-sm text-lumina-yellow font-medium">{r.projectType}</div>
                          <div className="text-xs text-white/40">Referral by: <span className="text-white font-bold">{r.referrerName}</span> ({r.referrerEmail})</div>
                       </div>
                       <div className="flex flex-col justify-between items-end gap-4">
                           <div className="px-3 py-1 bg-lumina-yellow/10 text-lumina-yellow rounded-full text-[10px] font-bold uppercase tracking-widest border border-lumina-yellow/20">
                              {r.status}
                           </div>
                           <div className="text-xs text-white/20">{r.createdAt?.toDate?.()?.toLocaleString()}</div>
                           <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setEditingReferral(r);
                                  setRefStatus(r.status);
                                }}
                                className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase border border-white/10 transition-colors"
                              >
                                {r.status === 'pending' ? 'Verify Lead' : 'Update Status'}
                              </button>
                              <a href={`mailto:${r.referrerEmail}`} className="btn-primary py-2 px-4 text-[10px]">Contact Partner</a>
                           </div>
                       </div>
                    </div>
                 ))}
              </div>
            )}

            {activeTab === "messages" && (
              <div key="messages" className="space-y-6">
                 {messages.map(m => (
                    <div key={m.id} className="bg-white/5 p-8 rounded-3xl border border-white/5 flex gap-8">
                       <div className="w-12 h-12 bg-lumina-yellow/10 rounded-2xl flex items-center justify-center text-lumina-yellow shrink-0">
                          <MessageSquare size={24} />
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                             <div className="text-lg font-bold">{m.name}</div>
                             <div className="w-1 h-1 bg-white/20 rounded-full" />
                             <div className="text-sm text-white/40">{m.email}</div>
                          </div>
                          <p className="text-white/80 leading-relaxed italic">&quot;{m.message}&quot;</p>
                          <div className="flex items-center space-x-6">
                             <a href={`tel:${m.phone}`} className="text-xs font-bold text-lumina-yellow uppercase tracking-widest hover:underline">Call Back</a>
                             <a href={`mailto:${m.email}`} className="text-xs font-bold text-lumina-yellow uppercase tracking-widest hover:underline">Reply Email</a>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </section>
  );
}

function SortIcon({ active, direction }: { active: boolean; direction: "asc" | "desc" }) {
  if (!active) return <ArrowUpDown size={12} className="opacity-20 group-hover:opacity-100 transition-opacity" />;
  return direction === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}
