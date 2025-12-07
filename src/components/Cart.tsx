import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function Cart({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-muted/50 animate-fade-in">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.price.toLocaleString()} ₽
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-gradient">{total.toLocaleString()} ₽</span>
                </div>
                <Button className="w-full gradient-purple text-white hover:opacity-90 transition-opacity">
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
