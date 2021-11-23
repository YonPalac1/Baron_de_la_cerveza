-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: barondelacerveza
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avatars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_FK` (`userId`) USING BTREE,
  CONSTRAINT `contacts_FK_copy` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (1,'avatar-default.png',36),(4,'avatar-default.png',37),(5,'avatar-default.png',38),(6,'avatar-default.png',39),(7,'avatar-default.png',40),(8,'avatar-default.png',41),(10,'avatar-default.png',40),(11,'avatar-default.png',41),(22,'avatar-default.png',113),(23,'avatar-default.png',114),(24,'avatar-default.png',115),(25,'avatar-default.png',118);
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'banner1.png'),(2,'banner2.png'),(3,'banner3.png'),(17,'1637519379363_img_.jpg');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Patagonia'),(2,'BierHause'),(3,'Stella Artois'),(4,'Brahma'),(5,'Sin marca'),(6,'Grunge'),(7,'Sin marca'),(100,'Sin marca'),(102,'Sin marca'),(103,'Sin marca'),(104,'Sin marca'),(105,'Sin marca'),(106,'Sin marca'),(107,'Andes'),(108,'Quilmes');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Lager'),(2,'Black IPA'),(3,'Stella Artois'),(4,'Brahma'),(5,'IPA'),(6,'Clasica'),(15,'Sin categoria'),(100,'Sin categoria'),(101,'Sin categoria'),(102,'Sin categoria'),(103,'Sin categoria'),(104,'Sin categoria'),(105,'Sin categoria'),(106,'Sin categoria'),(107,'Sin categoria'),(108,'Sin categoria'),(109,'Sin categoria'),(110,'Sin categoria'),(111,'Sin categoria'),(112,'Sin categoria'),(113,'Sin categoria'),(114,'Sin categoria'),(115,'Sin categoria'),(116,'Sin categoria'),(117,'Sin categoria'),(118,'Sin categoria'),(119,'Sin categoria'),(120,'Sin categoria'),(121,'Sin categoria'),(122,'Sin categoria'),(123,'Sin categoria'),(124,'1'),(125,'Sin categoria'),(126,'Sin categoria'),(127,'Sin categoria'),(128,'Sin categoria'),(129,'Sin categoria'),(130,'Sin categoria'),(131,'Sin categoria'),(132,'Sin categoria'),(133,'Sin categoria'),(134,'Sin categoria'),(135,'Sin categoria'),(136,'Sin categoria'),(137,'Sin categoria'),(138,'Sin categoria'),(139,'Sin categoria'),(140,'Sin categoria'),(141,'Sin categoria'),(142,'Sin categoria'),(143,'Sin categoria'),(144,'Sin categoria'),(145,'Sin categoria'),(146,'Sin categoria'),(147,'Sin categoria'),(148,'Sin categoria'),(149,'Sin categoria'),(150,'Sin categoria'),(151,'Sin categoria'),(152,'Sin categoria');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `city` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  `phone` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_FK` (`userId`),
  CONSTRAINT `contacts_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (34,'calle falsa 123','buenos aires',36,'buenos aires','011 39366942'),(35,NULL,NULL,37,NULL,NULL),(36,'','buenos aires',38,'buenos aires',''),(37,NULL,NULL,39,NULL,NULL),(38,NULL,NULL,40,NULL,NULL),(39,NULL,NULL,41,NULL,NULL),(64,NULL,NULL,113,NULL,NULL),(65,NULL,NULL,114,NULL,NULL),(66,NULL,NULL,115,NULL,NULL),(67,NULL,NULL,118,NULL,NULL);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `alcoholContent` decimal(10,0) DEFAULT NULL,
  `outstanding` tinyint(1) DEFAULT NULL,
  `images` varchar(100) DEFAULT NULL,
  `brandId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_idx` (`categoryId`),
  CONSTRAINT `category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (124,'Happy Lager',220,10,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',1,'2021-10-15 01:14:34','2021-11-23 17:53:01',0,0,'img1.jpg',1),(125,'Dark Vader',205,10,'Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. ',2,'2021-10-15 01:16:03','2021-10-15 01:16:03',10,1,'img2.png',2),(126,'Notre',210,10,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',3,'2021-10-15 01:16:42','2021-10-15 01:16:42',30,1,'img3.png',3),(127,'Clasica',210,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',4,'2021-10-15 01:17:17','2021-10-15 01:17:17',21,1,'img4.png',4),(128,'Fernandez IPA',210,20,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',5,'2021-10-15 01:17:45','2021-10-15 01:17:45',23,1,'img5.png',1),(129,'Brahma Chop',150,15,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',6,'2021-10-15 01:18:32','2021-10-15 01:18:32',23,1,'img6.png',4),(130,'Andes Origen',250,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',3,'2021-10-15 01:19:16','2021-11-21 18:20:17',12,1,'img7.png',100),(317,'Jonatan',12,0,' asd',4,'2021-11-21 21:50:10','2021-11-21 21:51:17',0,1,'1637531410429_img_.jpg',6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `bannerOk` varchar(100) DEFAULT NULL,
  `social_id` varchar(70) NOT NULL,
  `social_provider` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (23,'Jonatan32','admin@admin.com','$2a$12$.kY/agV7..nJy1HQ1LApjeZBgaOjXuIfs8q6yF45z75PqM8iYq.82',1,'2021-10-13 21:53:46','2021-11-22 22:35:53','1','',''),(36,'Jonatan','email@email.com','$2a$12$1o8TV1O0gAkffnFFXIUtLuml1b99asNMIcmNPrgFRl33PL6cjNWj.',0,'2021-10-17 03:02:25','2021-11-22 20:48:16','0','',''),(37,'Jonatan32','jona@mail.com','$2a$12$GRQK8FNZL4cXwc2KTat8wOBNLuUL6WZeNbSSB0uC90BDWAWOVPyA6',0,'2021-11-06 14:20:17','2021-11-22 21:19:20','0','',''),(38,'Jonatan','jonatan@email.com','$2a$12$8vn9PpkZB91sXobqTBIeIe5QzA43rhPkF5MH.tKk2caJSxEVLlLpG',0,'2021-11-06 15:31:02','2021-11-06 18:38:41','0','',''),(39,'Jonatan','jonatan1@email.com','$2a$12$lMu8E/f0K.c0CVc6ShpCdeqDw3pTt8ZV5CWyQKu3TyTa0AnQvce9e',0,'2021-11-10 21:21:29','2021-11-10 21:21:29','0','',''),(40,'La razon','mati@admin.com','$2a$12$4JjXMQc3A6L/M1cBYLzQVuyQ5D3AaNU7gpwjY8mTXnzK/NaKQ913K',0,'2021-11-11 16:14:55','2021-11-11 16:14:55','0','',''),(41,'asd','prueba1@email.com','$2a$12$pJb/Z5yh/X1.1Y.NKWdGqOQdT2IpsbrbRIAn7JqYYPjd2d7VfV4/i',0,'2021-11-16 18:23:05','2021-11-16 18:23:05','0','',''),(113,'Yonatan','yon.palac@gmail.com',NULL,0,'2021-11-21 18:39:35','2021-11-21 18:39:35','0','100379892172742441091','google'),(114,'NuevoADmin','nuevoUser@email.com','$2a$12$J/hshkJQxHZ1F1ae9dOQ9.RwAlzSpS.53t1OfmDTxzZ5E5nd684SO',0,'2021-11-22 19:37:20','2021-11-22 19:37:20','0','',''),(115,'OtroUser','otroUser@gmail.com','$2a$12$u6rnl4X84gGwbmFj3ZLnD.cToVO.lKTP3K4Oy2adw0HytkjDufB3K',0,'2021-11-22 19:38:44','2021-11-22 19:38:44','0','',''),(116,'NuevoAdmin','admin2@admin.com','$2a$12$.kY/agV7..nJy1HQ1LApjeZBgaOjXuIfs8q6yF45z75PqM8iYq.82',2,'2021-11-22 21:33:50','2021-11-22 21:33:50','0','',''),(117,'Jonatan2','admin3@admin.com','$2a$12$T65yOBt8vvBgKkLYsfEKxOmqbRkE7WyFzuj93HNu.vFbZSHIEe2mu',2,'2021-11-22 21:41:57','2021-11-22 21:41:57','0','',''),(118,'Jonatan32','Jonatan1@gmail.com','$2a$12$mlHr5eTK9rZrHrCE5IkQ8um1XCi1YUdxduFFEwPWq1w/WGz6FUZYS',0,'2021-11-23 17:40:03','2021-11-23 17:40:03','0','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barondelacerveza'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-23 21:56:53
