import crypto from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("surveys")
class Survey {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
  }
}

export { Survey };
