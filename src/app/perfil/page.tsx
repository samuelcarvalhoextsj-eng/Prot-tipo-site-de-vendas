import { createClient } from "@/lib/supabase/server";
import { Package, LogOut, Settings, Heart, MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch Orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="glass-card rounded-3xl p-6 sticky top-24">
            <div className="flex flex-col items-center text-center border-b border-border pb-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary mb-4 border-2 border-border">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-primary-600 to-accent">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold">{profile?.full_name || "Usuário"}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              
              {profile?.role === 'admin' && (
                <div className="mt-2 bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full border border-primary-500/30">
                  Administrador
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl font-medium">
                <Package className="w-5 h-5" /> Meus Pedidos
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                <Heart className="w-5 h-5" /> Favoritos
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                <MessageSquare className="w-5 h-5" /> Minhas Avaliações
              </a>
              <a href="/minha-conta/configuracoes" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                <Settings className="w-5 h-5" /> Configurações
              </a>
              
              <form action="/auth/signout" method="post" className="mt-4">
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors font-medium">
                  <LogOut className="w-5 h-5" /> Sair da conta
                </button>
              </form>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
          
          <div className="flex flex-col gap-6">
            {!orders || orders.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl text-center flex flex-col items-center">
                <Package className="w-16 h-16 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum pedido encontrado</h3>
                <p className="text-muted-foreground mb-6">Você ainda não realizou nenhuma compra na Nexus.</p>
                <a href="/#catalogo" className="glass px-6 py-3 rounded-full font-medium hover:bg-secondary/50 transition-colors">
                  Explorar Produtos
                </a>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="glass-card p-6 rounded-3xl">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pedido #{order.id.split('-')[0]}</p>
                      <p className="font-medium">{new Date(order.created_at).toLocaleDateString('pt-BR', { dateStyle: 'long' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : ''}
                        ${order.status === 'delivered' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : ''}
                      `}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total</p>
                      <p className="font-bold text-lg">R$ {Number(order.total_amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                          {/* Fallback image handle if no image array */}
                          {item.products?.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.products.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-muted-foreground opacity-50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.products?.name || "Produto Removido"}</p>
                          <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                        </div>
                        <div className="font-medium">
                          R$ {Number(item.price_at_time).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
