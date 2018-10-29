import { Database } from "../database";
import config from "../config";

export class CliDatabase {
  constructor(private database: Database) {}

  async create(): Promise<string> {
    try {
      const exists = await this.database.exists();

      if (exists) {
        return `Database ${config.database.dbname} already created.`;
      }

      await this.database.query(
        `CREATE DATABASE IF NOT EXISTS ${config.database.dbname}`
      );
      return `Database ${config.database.dbname} created.`;
    } catch (err) {
      throw new Error(
        `Can't create database ${config.database.dbname}. ${err}`
      );
    }
  }

  async createSchema() {
    try {
      const message = await this.database.use();

      if (message) {
        return message;
      }

      await this.database.query(`CREATE TABLE IF NOT EXISTS \`task\` (
                                      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
                                      \`name\` varchar(100) DEFAULT NULL,
                                      \`done\` tinyint(1) DEFAULT '0',
                                      PRIMARY KEY (\`id\`)
                                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
      await this.database.query(`CREATE TABLE IF NOT EXISTS \`user\` (
                                      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
                                      \`username\` varchar(100) NOT NULL DEFAULT '',
                                      \`password\` varchar(255) NOT NULL DEFAULT '',
                                      PRIMARY KEY (\`id\`),
                                      UNIQUE KEY \`UNIQUE_USERNAME\` (\`username\`)
                                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);

      await this.database.query(`CREATE TABLE IF NOT EXISTS \`reservation\` (
                                      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
                                      \`name\` varchar(100) NOT NULL DEFAULT '',
                                      \`hotelName\` varchar(255) NOT NULL DEFAULT '',
                                       \`arrivalDate\` DATETIME NOT NULL,
                                        \`departureDate\` DATETIME NOT NULL,
                                      PRIMARY KEY (\`id\`),
                                      UNIQUE KEY \`UNIQUE_NAME\` (\`name\`)
                                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
      return "Database schema created";
    } catch (e) {
      throw new Error(`Error during create schema : ${e.message}`);
    }
  }

  async dropSchema() {
    const message = await this.database.use();

    if (message) {
      return message;
    }

    await this.database.query("DROP TABLE IF EXISTS task");
    await this.database.query("DROP TABLE IF EXISTS `user`");
    return "Database schema dropped.";
  }

  async drop(): Promise<string> {
    try {
      const exists = await this.database.exists();

      if (!exists) {
        return `Database ${config.database.dbname} does not exists.`;
      }

      await this.database.query(
        `DROP DATABASE IF EXISTS ${config.database.dbname}`
      );
      return `Database ${config.database.dbname} dropped.`;
    } catch (err) {
      throw new Error(`Cannot drop database ${config.database.dbname}. ${err}`);
    }
  }
}
