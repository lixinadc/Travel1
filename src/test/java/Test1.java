import com.lx.dao.CartsDao;
import com.lx.dao.ProTypeDao;
import com.lx.dao.ProductDao;
import com.lx.dao.UserDao;
import com.lx.entity.Product;
import com.lx.entity.User;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test1 {

	@Test
	public void test() {
		ApplicationContext app=new ClassPathXmlApplicationContext("ssm_config.xml");
		UserDao uDao=(UserDao) app.getBean("userDao");
//		System.out.println(uDao.getSelectUser(1,6,null,1));
//		System.out.println(uDao.getUserCount(null,2));

//		User user=new User(null, "tt1", "2256@qq.com", "1234", 0, "15022987689", "广州市" );
//		uDao.addUser(user);
	//	System.out.println(uDao.isExist("tt2"));
		User user =new User("tt", "123", 1);
		System.out.println(uDao.login(user));

		CartsDao cDao = (CartsDao) app.getBean("cartsDao");
		//cDao.dels("42,43");
		//cDao.del(42);
		//System.out.println(cDao.getAll1("外","tt"));
		//cDao.update(1,"邮票",200,6);
//		String[] ids = {"41" , "61" } ;
//		cDao.deleteMore(ids);
		ProTypeDao ptDao=(ProTypeDao)app.getBean("proTypeDao");
		//System.out.println(ptDao.getType());
		ProductDao prDao=(ProductDao)app.getBean("productDao");
		//System.out.println(prDao.getSelectResult(2,4,null,-1));
		//System.out.println(prDao.getProductCount("国",-1));
		//System.out.println(prDao.getProductOne(1));
//		Carts carts=new Carts(null,"12345",1,"小邮票",200,10,null,"tt","images/shop/large/stamp1.jpg");
//		cDao.addCart(carts);
		Product p=new Product(7,"旅游地图1",2,300,600,"6折",200,"images/shop/large/shop_2.jpg","images/shop/large/shop_2.jpg");
		//prDao.addProduct(p);
		//prDao.updateProduct(p);
		//prDao.delProduct(7);
	}

}
