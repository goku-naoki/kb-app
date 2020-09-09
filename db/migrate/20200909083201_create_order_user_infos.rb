class CreateOrderUserInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :order_user_infos do |t|

      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :first_name_kana, null: false
      t.string :last_name_kana, null: false
      t.integer :postal_code, null: false
      t.integer :prefecture_id, null: false
      t.string :city, null: false
      t.string :addresses, null: false
      t.string :building
      t.string :phone_number, null: false
      t.string :email, null: false
      t.timestamps
    end
  end
end
