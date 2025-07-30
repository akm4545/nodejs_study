# **회원 가입과 인증하기**  
# **실습용 프로젝트 설정하기**  
# **nest-cli로 프로젝트 생성하기**  
1. nest-cli에서 다음 명령을 입력해 프로젝트를 생성한다.  
nest new nest-auth-test  
  
이번에는 더 복잡한 구조의 프로그램을 만들게 되므로 AuthModule과 UserModule을 추가로 만들어 사용한다. AppModule에는 전체 애플리케이션 관련 설정을, 
AutModule에는 인증 관련 기능을, UserModule 모듈에는 유저 데이터를 다루는 기능을 구현한다. 다음과 같이 AppModule의 하위에 AuthModule과 UserModule을 
둔다.  
  
![img.png](image/img.png)  
  
인증을 담당하는 AuthModule은 AuthController, AuthService 클래스로 구성된다. AuthController에는 인증에 필요한 핸들러 메서드를 설정한다. 
AuthService에는 회원 가입과 회원 유효성을 검증하는 메서드를 추가한다. AuthService의 회원 가입 메서드에서 UserService를 주입해 사용한다. UserService에는 
회원정보 추가, 수정, 삭제 등의 메서드가 있다.  
  
# **User 모듈 생성하기**  
1. 다음 명령을 차례대로 입력하면 nest-cli가 자동으로 기본 코드를 만들어준다.  
nest g module user  
nest g controller user --no-spec  
nest g service user --no-spec  
  
이렇게 하면 src 디렉터리 아래에 user 디렉터리가 생기고 user 디렉터리는 명령어로 생성한 module, controller, service 파일이 있다. 유저 정보를 
저장하려면 리포지토리가 필요하다. 리포지토리는 생성하지 않고 ORM 라이브러리로 TypeORM 라이브러리에서 지원하는 Repository 클래스를 사용한다. 데이터베이스로 SQLite를 
사용한다.  
  
# **SQLite 데이터베이스 설정하기**  
1. 먼저 필요한 패키지부터 설치한다. sqlite3와 typeorm 그리고 typeorm을 nest에서 편하게 사용하려면 @nestjs/typeorm이 필요하니 설치한다.  
  
npm install sqlite3 typeorm @nestjs/typeorm  
  
2. 설치를 완료하고 app.module.ts에 설정을 한다.  
nest-auth-test/src/app.module.ts  
  
TypeOrmModule.forRoot() 메서드는 매우 많은 속성을 가지고 있지만 type, database, entities만 설정해주면 동작한다. type은 데이터베이스의 타입이고 
database는 데이터베이스 파일명이다. SQLite는 확장자로 sqlite를 사용한다.  
  
![img.png](image/img2.png)  
  
entities에는 엔티티로 만드는 객체를 넣어주면 된다. synchronize를 true로 하면 서버 기동 시 서버가 엔티티 객체를 읽어서 데이터베이스 스키마를 만들거나 
변경해준다. synchronize 옵션은 꼭 개발용으로만 사용해야 한다. 프로덕션 서버에서 사용하면 서버 기동 시 의도치 않게 데이터베이스 스키마를 변경할 수도 
있기 때문이다. logging은 true로 설정 시 SQL 실행 로그를 확인할 수 있다.  
  
# **유저 모듈의 엔티티, 서비스, 컨트롤러 생성하기**  
# **엔티티 만들기**  
1. 유저 엔티티는 데이터베이스 테이블과 1:1로 매칭되는 객체다. 작성할 유저 엔티티는 id, email, username, password, createDt 속성을 가지고 있다.  
nest-auth/src/user/user.entity.ts  
  
엔티티 객체를 만들기 위한 데코레이터들은 typeorm에서 가져와서 사용한다. 엔티티 객체는 @Entity 데코레이터를 붙여줘야 다른 곳에 의존성 주입을 할 수 있다. 
@PrimaryGeneratedColumn이 붙은 필드는 기본키이면서 자동 증가하는 컬럼이 된다. id 뒤에 있는 ?는 객체 생성 시 필수값이 아닌 선택적인 값임을 표시해준다. 
자동 증가하는 값이므로 데이터 생성 시에는 필요하지 않기 때문이다. @Column이 붙으면 데이터베이스의 컬럼으로 인식한다. unique:true를 붙여주면 중복 
데이터가 존재하는 경우 저장되지 않고 에러가 난다. 생성일 데이터는 기본값을 넣도록 default: true 설정을 추가해준다.  
  
2. 엔티티를 만들었으니 유저 서비스를 만든다.  
nest-auth-test/src/user/user.service.ts  
  
InjectRepository는 레포짙리 의존성을 주입하는 데코레이터다. Repository는 typeorm의 레포지토리다. 저장, 읽기 같은 기본적인 메서드들을 제공한다. 
사용 시에는 Repository<User>와 같이 엔티티 객체를 타입으로 추가해야 한다. <> 안에는 엔티티 객체 타입을 넣어주면 된다. 생성자 안에는 레포지토리를 주입하는 
코드를 작성한다. @InjectRepository(User)로 User 타입의 리포지토리를 주입한다고 알려준다. 다음으로 private userRepository로 변수를 선언한다. 
해당 변수의 타입은 Repository<User> 타입이다.  
  
![img.png](image/img3.png)  
![img.png](image/img4.png)  
  
# **컨트롤러 만들기**
1. 유저 컨트롤러는 유저가 요청을 보냈을 때 실행되는 핸들러 메서드를 정의한다. 컨트롤러 코드를 작성한다.  
nest-auth-test/src/user/user.controller.ts  
  
@Controller는 컨트롤러임을 나타내는 데코레이터다. 'user' 문자열은 주소가 user로 시작된다는 것을 말한다. 생성자에서 유저 서비스를 주입받아서 
userService 객체에 할당한다.  
  
# **서비스 만들기**  
1. 서비스는 컨트롤러와 레포지토리를 이어주는 역할을 한다. 컨트롤러를 작성한다.  
nest-auth-test/src/user/user.service.ts  
  
@Injectable() 데코레이터가 있으면 프로바이더가 된다. 모듈에 설정을 하면 다른 객체에 주입할 수 있다. userRepository.save() 메서드는 업데이트에도 사용한다. 
getUser()는 유저 한 명을 찾는데 userRepository.findOne() 메서드를 사용한다. where 조건에 email을 넣었으므로 email로 찾는다.  
  
2. 추가로 서비스에서 사용하는 레포지토리를 모듈에 등록해주어야 한다. 레포지토리를 모듈에 등록하지 않으면 서비스에서 레포지토리를 찾을 수 없어서 서버 
기동 시 에러가 나게 된다.  
nest-auth-test/src/user/user.module.ts  
  
3. 엔티티가 등록이 되어 있어야만 typeorm에서 해당 엔티티에 대한 메타 데이터를 읽을 수 있다. app.module.ts의 TypeOrmModule 설정에 User 엔티티를 
추가한다.  
nest-auth-test/src/app.module.ts  
  
# **테스트하기**  
1. 테스트용 HTTP 파일을 만들어 생성, 유저 정보 읽기, 업데이트, 삭제가 모두 잘 동작하는지 확인한다.  
nest-auth-test/src/user/user.http  
  
# **파이프로 유효성 검증하기**    
익스프레스에서는 컨트롤러 역할을 하는 곳 또는 별도의 라이브러리를 사용해 검증을 진행하지만 NestJS에서는 파이프(pipe)를 사용해서 유효성 검증을 한다.  
  
![img.png](image/img5.png)  
  
다양한 파이프들이 있으며 직접 만들 수도 있지만 여기서는 가장 사용하기 간편한 ValidationPipe를 사용한다. ValidationPipe를 사용하려면 class-validator와 
class-transformer를 설치해야 한다.  
  
class-transformer는 JSON 정보를 클래스 객체로 변경한다. 받은 요청(payload)을 변환한 클래스가 컨트롤러의 핸들러 메서드의 매개변수에 선언되어 있는 
클래스와 같다면 유효성 검증을 한다. class-validator는 데코레이터를 사용해 간편하게 유효성 검증을 하는 라이브러리다. 유저 관련 로직을 작성할 때는 타입을 
User 엔티티로 바로 사용했지만 클라이언트와 데이터를 주고받을 때는 보통 데이터 전송 객체(DTO)를 따로 만들어 사용한다.  
  
유효성 검증으로 @UsePipes 데코레이터와 Joi 라이브러리를 사용하는 방법도 있지만 스키마를 만들어야 하고 메서드마다 @UsePipes 데코레이터를 일일이 
붙여야 한다. 프로젝트 전체에서 유효성 검증을 제어할 떄는 ValidationPipe + class-transformer를 사용한 방법이 조금 더 유용하다. 반면 개별 메서드에서 
상세한 유효성 검증 로직이 필요할 때는 @UsePipe와 Joi 라이브러리를 이용하는 방법이 유용하다.  
  
# **전역 ValidationPipe 설정하기**  
1. 유효성 검증을 하려면 ValidationPipe를 main.ts에 설정해야 한다. ValidationPipe 추가는 간단하다. 의존성을 설치하고 임포트를 하고 전역 파이프 
설정에 ValidationPipe 객체를 생성해 넣으면 끝이다.  
  
ValidationPipe 의존성 설치  
npm install class-validator class-transformer  
  
ValidationPipe 설정  
nest-auth-test/src/main.ts  
  
# **UserDto 만들기**  
1. 유저 디렉터리에 UserDto 객체를 만든다. 생성 시와 수정 시 검사 항목이 다르기 때문에 CreateUserDto와 UpdateUserDto를 따로 만든다.  
nest-auth-test/src/user/user.dto.ts  
  
email 필드에는 @IsEmail을 붙여서 이메일인지 검증하고 그 외에는 IsString을 붙여서 문자열이 들어갈 수 있게 해준다.  
  
![img.png](image/img6.png)  
![img.png](image/img7.png)  
  
# **인증 모듈 생성 및 회원 가입하기**  
인증을 만드는 방법은 2가지다. 쿠키를 기반으로 만들거나 토큰 기반으로 만들 수 있다. 쿠키가 없는 토큰 기반을 쿠키리스(cookieless)라고 부른다. 쿠키는 
서버에서 보내준 쿠키를 클라이언트(주로 브라우저)에 저장해 관리한다. 토큰은 서버에 상태를 저장할 필요가 없다. 쿠키와 토큰은 서로 장단점이 있으므로 
요구사항에 따라 선택하면 된다.  
  
![img.png](image/img8.png)  
![img.png](image/img9.png)  
  
토큰은 OAuth를 사용한 소셜 로그인에서 사용할 예정이므로 먼저 쿠키를 사용해 인증을 구현한다.  
  
# **인증 모듈 만들기 및 설정하기**  
1. 인증 모듈을 만든다. 다음의 명령어를 nest-auth-test 디렉터리에서 실행해 인증 모듈 및 service와 controller를 만든다.  
nest g module auth  
nest g service auth --no-spec  
nest g controller auth --no-spec  
  
--no-spec은 테스트 파일을 만들지 않는다는 의미다.  
  
2. UserService를 AuthService에서 주입받을 수 있도록 user.module.ts에 exports 설정을 추가한다.  
nest-auth-test/src/user/user.module.ts  
  
인증 모듈의 AuthService에서는 회원 가입이나 로그인/로그아웃 처리에 UserService를 이용한다. @Injectable()이 붙어 있는 프로바이더의 경우 같은 
모듈의 다른 클래스에서 주입해 사용할 수 있다. 다만 다른 모듈에서 사용하려면 @Module 데코레이터의 속성으로 exports에 프로바이더를 넣어주어야 한다.  
  
3. 다음으로 AuthModule에 UserModule의 import 설정을 추가한다.  
nest-auth-test/src/auth/auth.module.ts  
  

  


  

  



