import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'English World 1 Student Book',
      price: 1490,
      category: 'Учебники',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop',
      description: 'Современный курс для 1 класса с интерактивными заданиями',
    },
    {
      id: 2,
      name: 'Oxford Discover 2',
      price: 1790,
      category: 'Учебники',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop',
      description: 'Европейский учебник для 2 класса с красочными иллюстрациями',
    },
    {
      id: 3,
      name: 'Kid\'s Box 3 Activity Book',
      price: 990,
      category: 'Рабочие тетради',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=500&fit=crop',
      description: 'Рабочая тетрадь Cambridge для 3 класса',
    },
    {
      id: 4,
      name: 'Super Minds 4 Student\'s Book',
      price: 1890,
      category: 'Учебники',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
      description: 'Учебник Cambridge с QR-кодами для аудио',
    },
    {
      id: 5,
      name: 'Everybody Up 1 Workbook',
      price: 890,
      category: 'Рабочие тетради',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop',
      description: 'Oxford рабочая тетрадь с играми и заданиями',
    },
    {
      id: 6,
      name: 'Family and Friends 2',
      price: 1590,
      category: 'Учебники',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop',
      description: 'Популярный европейский курс Oxford для младших школьников',
    },
  ];

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar cartCount={totalItems} onCartClick={() => setCartOpen(true)} />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="space-y-6 animate-fade-in">
              <Badge className="gradient-purple text-white border-0">Новинки сезона 2024</Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Английский для <span className="text-gradient">детей</span> легко и интересно
              </h1>
              <p className="text-lg text-muted-foreground">
                Современные европейские учебники для начальной школы с увлекательными заданиями
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="gradient-purple text-white hover:opacity-90" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Смотреть учебники
                </Button>
                <Button size="lg" variant="outline">
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop"
                alt="Hero"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Каталог <span className="text-gradient">учебников</span>
            </h2>
            <p className="text-muted-foreground">Выберите подходящий курс для вашего ребенка</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'gradient-purple text-white' : ''}
              >
{category === 'all' ? 'Все книги' : category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 gradient-orange text-white border-0">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gradient">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <Button
                      className="gradient-blue text-white hover:opacity-90"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
                alt="About"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                О <span className="text-gradient">BookHub</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы специализируемся на лучших европейских учебниках английского языка. Наша миссия —
                сделать обучение английскому увлекательным и эффективным для каждого ребенка.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold">Качество</h4>
                  <p className="text-sm text-muted-foreground">Только Oxford, Cambridge, Pearson</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold">Доставка</h4>
                  <p className="text-sm text-muted-foreground">Быстрая доставка по России</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Наш <span className="text-gradient">блог</span>
            </h2>
            <p className="text-muted-foreground">Полезные статьи об обучении английскому</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Как выбрать первый учебник английского',
                date: '15 декабря 2024',
                image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
              },
              {
                title: 'Европейские методики: что важно знать',
                date: '10 декабря 2024',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
              },
              {
                title: 'ТОП-5 курсов для начальной школы',
                date: '5 декабря 2024',
                image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop',
              },
            ].map((post, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                  <Button variant="link" className="p-0 text-primary">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Часто задаваемые <span className="text-gradient">вопросы</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Какие способы оплаты вы принимаете?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы принимаем оплату банковскими картами, через электронные кошельки и наличными
                при получении.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Сколько времени занимает доставка?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Доставка по Москве занимает 1-2 дня, по России — 3-7 дней в зависимости от региона.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Почему европейские учебники?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Европейские учебники соответствуют международным стандартам CEFR и используют
                современные методики обучения с увлекательными заданиями.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Какой учебник подойдет моему ребенку?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Выбор зависит от возраста и уровня ребенка. Напишите нам, и мы поможем
                подобрать подходящий курс для начальной школы.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Свяжитесь <span className="text-gradient">с нами</span>
            </h2>
            <p className="text-muted-foreground">Мы всегда рады ответить на ваши вопросы</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Адрес</h4>
                  <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 123</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Телефон</h4>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-muted-foreground">info@bookhub.ru</p>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение..." rows={4} />
                </div>
                <Button className="w-full gradient-purple text-white hover:opacity-90">
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">BookHub</span>
              </div>
              <p className="text-slate-400 text-sm">
                Лучшие учебники английского для детей
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Facebook" size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Instagram" size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Twitter" size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            © 2024 BookHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}