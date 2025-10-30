-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 12:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drontv`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_about`
--

CREATE TABLE `tbl_about` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `bio` text NOT NULL,
  `experience` int(11) NOT NULL,
  `projects_count` int(11) NOT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`skills`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_about`
--

INSERT INTO `tbl_about` (`id`, `user_id`, `bio`, `experience`, `projects_count`, `skills`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'I’m Shaikh Rehan, a passionate Web Developer with a strong foundation in front-end and back-end technologies. I specialize in creating dynamic, responsive, and user-friendly web applications using React, Node.js, Laravel, and Django. With hands-on experience in both academic and real-world projects, I aim to deliver clean code and seamless digital experiences that help businesses grow and innovate.', 3, 20, '[\"Python\",\"Java\",\"JavaScript\",\"Php\"]', 1, 0, '2025-10-30 07:02:05', '2025-10-30 11:43:15'),
(2, 2, 'I’m Aman, a passionate Web Developer with a strong foundation in front-end and back-end technologies. I specialize in creating dynamic, responsive, and user-friendly web applications using React, Node.js, Laravel, and Flutter. With hands-on experience in both academic and real-world projects, I aim to deliver clean code and seamless digital experiences that help businesses grow and innovate.', 4, 26, '[\"Node\",\"React\",\"Flutter\",\"IOS\",\"PHP\"]', 1, 0, '2025-10-30 07:52:16', '2025-10-30 07:52:16'),
(3, 3, '\nLorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur incidunt itaque soluta delectus vero aut minus iure voluptatem ut? Quae animi reiciendis odit officiis nisi numquam, tempore consectetur vero porro necessitatibus corporis ipsam similique autem. Quam qui facilis eveniet repellat pariatur ea saepe ullam reiciendis quia, voluptatibus, exercitationem dolore molestiae temporibus iusto accusantium modi est?', 5, 33, '[\"React\",\"Node\",\"Next\",\"Angular\",\"Vue\",\"Php\",\"Laravel\"]', 1, 0, '2025-10-30 08:16:12', '2025-10-30 08:16:12'),
(4, 4, 'Inventore nobis odit', 7, 25, '[\"React\",\"Node\",\"Next\",\"Angular\",\"Vue\",\"Php\",\"Laravel\"]', 1, 0, '2025-10-30 11:24:03', '2025-10-30 11:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contact`
--

CREATE TABLE `tbl_contact` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `email` varchar(128) NOT NULL,
  `phone` char(16) NOT NULL,
  `address` text NOT NULL,
  `social_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`social_links`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_contact`
--

INSERT INTO `tbl_contact` (`id`, `user_id`, `email`, `phone`, `address`, `social_links`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'dilobi@mailinator.com', '+1 (421) 192-634', 'Tempor irure amet m', '{\"linkedin\":\"https://www.sozucimes.tv\",\"github\":\"https://www.xalosozomoqoh.biz\",\"twitter\":\"https://www.paqag.org\",\"facebook\":\"https://www.ber.info\",\"instagram\":\"https://www.wivi.co.uk\",\"website\":\"https://www.gagijaveb.us\"}', 1, 0, '2025-10-30 07:13:01', '2025-10-30 07:13:01'),
(2, 2, 'ponake@mailinator.com', '+1 (142) 426-642', 'Surat, Agmedabad', '{\"linkedin\":\"https://www.nylemiduxuje.com.au\",\"github\":\"https://www.biqufuxumo.com\",\"twitter\":\"https://www.suqodup.in\",\"facebook\":\"https://www.pahelirohoho.tv\",\"instagram\":\"https://www.wywiwy.cm\",\"website\":\"https://www.hamaliposa.biz\"}', 1, 0, '2025-10-30 07:59:22', '2025-10-30 07:59:22'),
(3, 3, 'cazexy@mailinator.com', '+1 (797) 144-495', 'Placeat esse volup', '{\"linkedin\":\"https://www.fozydezahytubim.us\",\"github\":\"https://www.somykyz.co.uk\",\"twitter\":\"https://www.pupejogyqohoq.biz\",\"facebook\":\"https://www.fyseqisocy.in\",\"instagram\":\"https://www.katyxybyzicemo.us\",\"website\":\"https://www.pujixyluzywa.cc\"}', 1, 0, '2025-10-30 08:18:30', '2025-10-30 08:18:30'),
(4, 4, 'cofyraf@mailinator.com', '+1 (741) 876-747', 'Est cum non omnis mo', '{\"linkedin\":\"https://www.hylalitahak.info\",\"github\":\"https://www.vavux.in\",\"twitter\":\"https://www.jesy.co.uk\",\"facebook\":\"https://www.patevyceqavavej.org.au\",\"instagram\":\"https://www.ryzudygyqim.co.uk\",\"website\":\"https://www.wejen.tv\"}', 1, 0, '2025-10-30 11:25:42', '2025-10-30 11:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_footer`
--

CREATE TABLE `tbl_footer` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `company` varchar(128) NOT NULL,
  `year` int(11) NOT NULL,
  `copyright_text` varchar(255) NOT NULL,
  `additional_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`additional_links`)),
  `is_active` int(11) NOT NULL DEFAULT 1,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_footer`
--

INSERT INTO `tbl_footer` (`id`, `user_id`, `company`, `year`, `copyright_text`, `additional_links`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Paul Winters Traders', 2025, '© 2025 Shaikh Rehan— Designed & Developed with ❤️ and clean code', '[{\"text\":\"Portfolio\",\"url\":\"https://www.rysuvakegynyb.com\"},{\"text\":\"Contact\",\"url\":\"https://www.rysuvakegynyb.com\"}]', 1, 0, '2025-10-30 07:21:08', '2025-10-30 07:21:08'),
(2, 2, 'Jackson Duffy Traders', 2016, '© 2025 | Shaikh Aman| Web Developer & Mobile Application Developer', '[{\"text\":\"About Me\",\"url\":\"https://www.nihyhidaliz.cc\"},{\"text\":\"Portfolio\",\"url\":\"https://www.nihyhidaliz.cc\"},{\"text\":\"Contact\",\"url\":\"https://www.nihyhidaliz.cc\"}]', 1, 0, '2025-10-30 08:00:51', '2025-10-30 08:00:51'),
(3, 3, 'Maldonado Clark Co', 2006, 'Tempore quisquam ei', '[{\"text\":\"Quod est ea rerum er\",\"url\":\"https://www.vozazinevavy.us\"}]', 1, 0, '2025-10-30 08:18:40', '2025-10-30 08:18:40'),
(4, 4, 'Herrera Johnston Co', 2016, 'Accusantium accusant', '[{\"text\":\"Rem at placeat cons\",\"url\":\"https://www.cyrolyxorawyfoz.us\"}]', 1, 0, '2025-10-30 11:25:55', '2025-10-30 11:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hero`
--

CREATE TABLE `tbl_hero` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `hero_title` varchar(128) NOT NULL,
  `hero_subtitle` text NOT NULL,
  `hero_cta` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_hero`
--

INSERT INTO `tbl_hero` (`id`, `user_id`, `hero_title`, `hero_subtitle`, `hero_cta`, `image`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hi, I’m Shaikh Rehan— Web Developer', 'I’m a passionate Web Developer who loves turning ideas into elegant, user-friendly digital experiences.', 'View My Work', '1761807639952-h1.jpg', 1, 0, '2025-10-30 07:00:39', '2025-10-30 07:00:39'),
(2, 2, 'Crafting Code. Creating Impact', 'I’m a Full Stack Web Developer and Mobile Application who designs and develops responsive, high-performing websites that help businesses grow.', 'Let’s Collaborate', '1761810660406-h2.jpg', 1, 0, '2025-10-30 07:51:00', '2025-10-30 07:51:00'),
(3, 3, 'An executive role responsible for the company\'s technological needs', '\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Natus expedita tempora impedit labore facilis nulla eveniet aliquam aperiam quasi rem? Ducimus consectetur, consequatur explicabo tempora nesciunt sequi quasi excepturi magnam illum atque sit cumque. Dolorem quia sunt cum nesciunt necessitatibus alias et nostrum, corrupti, rerum nulla ipsum, illum ipsam. Laboriosam, beatae, nesciunt aliquid non perspiciatis in placeat iure necessitatibus nemo voluptatibus ab adipisci, excepturi maxime. Praesentium voluptas vel omnis, dolore nesciunt doloribus ea atque exercitationem, neque quaerat ipsam.', ' Lorem, ipsum.', '1761812094451-h5.jpg', 1, 0, '2025-10-30 08:14:54', '2025-10-30 08:14:54'),
(4, 4, 'Autem magni aperiam ', 'Voluptatem occaecat ', 'Consectetur ut esse', '1761821543881-p4.jpg', 1, 0, '2025-10-30 10:52:23', '2025-10-30 10:52:23');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_portfolio`
--

CREATE TABLE `tbl_portfolio` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `project_order` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_portfolio`
--

INSERT INTO `tbl_portfolio` (`id`, `user_id`, `title`, `description`, `link`, `image`, `project_order`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Job Portal-Hire Bub', 'The Project HireHub is a Job Portal builded in a Laravel-PHP for job seekers', 'https://github.com/Sohailshaikh5656/HireHub', '1761808168018-laravel-hirehub.png', 1, 1, 0, '2025-10-30 07:09:28', '2025-10-30 08:40:05'),
(2, 1, 'Music App', 'Music Streaming App build for music listner and this project is in building phase in Nextjs and Nodejs Tech.', 'https://github.com/Sohailshaikh5656/musicApp', '1761808168022-userSignUp.png', 2, 1, 0, '2025-10-30 07:09:28', '2025-10-30 07:09:28'),
(5, 2, 'Wheather App', '\nLorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat quibusdam culpa rerum dignissimos eveniet odit quas a, sunt, doloribus illo laudantium. Atque voluptate cupiditate laudantium pariatur quam! Dolorum id assumenda sed ullam tenetur eligendi neque? Tenetur non asperiores sunt explicabo nobis recusandae? Ipsa voluptate, cupiditate earum voluptas eaque perspiciatis dolorem iure officiis officia deserunt quo nostrum obcaecati quis ipsam unde ex aliquam dicta inventore aperiam. Tenetur laudantium aut rerum eligendi asperiores voluptatibus. Modi sequi asperiores fugiat. Laudantium ut ad odio quis eveniet non voluptate, esse fuga deleniti quasi? Inventore alias quod iure exercitationem animi vitae mollitia expedita? Perferendis, hic?', 'https://github.com/Sohailshaikh5656/HireHub', '1761811064867-m1.webp', 1, 1, 0, '2025-10-30 07:57:45', '2025-10-30 07:57:45'),
(6, 3, 'ipsum dolor sit.', '\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum repellat velit magnam placeat delectus aspernatur obcaecati at, ducimus explicabo?', 'https://github.com/Sohailshaikh5656/HireHub', '1761812256174-laravel-hirehub.png', 1, 1, 0, '2025-10-30 08:17:36', '2025-10-30 08:17:36'),
(7, 4, 'Voluptatibus numquam', 'Enim rerum illo sed ', 'https://www.rifofijawy.me', '1761823509890-laravel-hirehub.png', 1, 1, 0, '2025-10-30 11:25:09', '2025-10-30 11:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `user_id`, `title`, `description`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Front-End Development', 'Crafting beautiful and responsive websites using HTML, CSS, JavaScript, and React. I focus on building intuitive user interfaces that deliver seamless performance across all devices.', 1, 0, '2025-10-30 07:04:07', '2025-10-30 07:04:07'),
(2, 1, 'Back-End Development', 'Developing powerful and secure back-end systems using Node.js, Laravel, and Django. I ensure smooth data flow, API integration, and reliable server-side functionality for scalable web applications.', 1, 0, '2025-10-30 07:04:07', '2025-10-30 07:04:07'),
(3, 2, 'Front-End Development', 'I create modern, responsive, and visually appealing user interfaces using React, HTML, CSS, and JavaScript. My focus is on delivering fast-loading, mobile-friendly, and interactive designs that enhance user experience and reflect your brand perfectly.', 1, 0, '2025-10-30 07:53:11', '2025-10-30 07:53:11'),
(4, 2, 'Back-End Development', 'I develop secure, scalable, and high-performance server-side applications using Node.js, Laravel, and Django. From API integrations to database management, I ensure every web solution is optimized for speed, reliability, and smooth functionality.', 1, 0, '2025-10-30 07:53:11', '2025-10-30 07:53:11'),
(5, 2, 'Mobile Application Development', 'I develop secure, scalable, and high-performance server-side applications using Node.js, Laravel, and Django. From API integrations to database management, I ensure every web solution is optimized for speed, reliability, and smooth functionality.', 1, 0, '2025-10-30 07:53:11', '2025-10-30 07:53:11'),
(6, 3, ' Lorem, ipsum dolor.', '\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum repellat velit magnam placeat delectus aspernatur obcaecati at, ducimus explicabo?', 1, 0, '2025-10-30 08:16:54', '2025-10-30 08:16:54'),
(7, 3, ' Lorem, ipsum dolor.', '\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum repellat velit magnam placeat delectus aspernatur obcaecati at, ducimus explicabo?', 1, 0, '2025-10-30 08:16:54', '2025-10-30 08:16:54'),
(8, 4, 'Provident voluptas ', 'Sapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti et', 1, 0, '2025-10-30 11:24:38', '2025-10-30 11:24:38'),
(9, 4, 'Back-End Development', 'Sapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti etSapiente deleniti et', 1, 0, '2025-10-30 11:24:38', '2025-10-30 11:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_testimonials`
--

CREATE TABLE `tbl_testimonials` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_name` varchar(128) NOT NULL,
  `testimonial` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `testimonial_order` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_testimonials`
--

INSERT INTO `tbl_testimonials` (`id`, `user_id`, `client_name`, `testimonial`, `logo`, `testimonial_order`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Create Solutions', 'Illum tempore non Illum tempore non Illum tempore non Illum tempore non Illum tempore non Illum tempore non Illum tempore non Illum tempore non ', '1761808357877-c1.webp', 1, 1, 0, '2025-10-30 07:12:37', '2025-10-30 07:12:37'),
(2, 2, 'XCell Tech', ' dignissimos eveniet odit quas a, sunt, doloribus illo laudantium. Atque voluptate cupiditate laudantium pariatur quam! Dolorum id assumenda sed ullam tenetur eligendi neque? Tenetur non asperiores sunt explicabo nobis recusandae? Ipsa v', '1761811132390-c2.webp', 1, 1, 0, '2025-10-30 07:58:52', '2025-10-30 07:58:52'),
(3, 3, 'amet consectetur', '\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum repellat velit magnam placeat delectus aspernatur obcaecati at, ducimus explicabo?', '1761812296616-c4.webp', 1, 1, 0, '2025-10-30 08:18:16', '2025-10-30 08:18:16'),
(4, 4, 'Hurley Lynch Trading', 'Vero qui nisi dolore', '1761823532757-c5.webp', 1, 1, 0, '2025-10-30 11:25:32', '2025-10-30 11:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `company_name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `profession` varchar(128) NOT NULL,
  `age` int(11) NOT NULL,
  `state` varchar(128) NOT NULL,
  `city` varchar(128) NOT NULL,
  `image` varchar(255) NOT NULL,
  `template_id` int(11) NOT NULL,
  `steps` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `company_name`, `email`, `profession`, `age`, `state`, `city`, `image`, `template_id`, `steps`, `created_at`, `updated_at`, `is_active`, `is_deleted`) VALUES
(1, 'Shaikh Rehan', 'TATA TCS', 'rehan@gmail.com', 'Web Application Developer', 24, 'Gujarat', 'Ahmedabad', '1761807454334-p1.jpg', 2, 8, '2025-10-30 06:57:34', '2025-10-30 06:57:34', 1, 0),
(2, 'Shaikh Aman', 'HyperLink InfoSystem', 'shaikhaman@gmail.com', 'Mobile Application Developer', 25, 'Gujarat', 'Surat', '1761810581938-p6.jpg', 1, 8, '2025-10-30 07:49:41', '2025-10-30 07:49:41', 1, 0),
(3, 'Eugenia Burch', 'Wallace Moody LLC', 'hylarulic@mailinator.com', 'Magni velit assumend', 22, 'Gujarat', 'Rajkot', '1761811977421-c3.webp', 1, 8, '2025-10-30 08:12:57', '2025-10-30 08:12:57', 1, 0),
(4, 'Zane Kirkland', 'Anderson and Davis Traders', 'gumetazy@mailinator.com', 'Totam voluptatem iur', 26, 'Gujarat', 'Jamnagar', '1761813008819-p5.jpg', 2, 8, '2025-10-30 08:30:08', '2025-10-30 11:38:17', 1, 0),
(5, 'Elizabeth Gilbert', 'Prince and Mcdaniel LLC', 'cuson@mailinator.com', 'Atque dolor aperiam ', 34, 'Gujarat', 'Ahmedabad', '1761823795759-c1.webp', 1, 1, '2025-10-30 11:29:55', '2025-10-30 11:29:55', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_about`
--
ALTER TABLE `tbl_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_contact`
--
ALTER TABLE `tbl_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_footer`
--
ALTER TABLE `tbl_footer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_hero`
--
ALTER TABLE `tbl_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_portfolio`
--
ALTER TABLE `tbl_portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_testimonials`
--
ALTER TABLE `tbl_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_about`
--
ALTER TABLE `tbl_about`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_contact`
--
ALTER TABLE `tbl_contact`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_footer`
--
ALTER TABLE `tbl_footer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_hero`
--
ALTER TABLE `tbl_hero`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_portfolio`
--
ALTER TABLE `tbl_portfolio`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_testimonials`
--
ALTER TABLE `tbl_testimonials`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
