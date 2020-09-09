class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|

      t.references :order_user_info, null: false, foreign_key: true
      t.timestamps
    end
  end
end
